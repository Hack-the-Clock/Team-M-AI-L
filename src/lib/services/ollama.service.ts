// Ollama AI Service
import axios from 'axios';

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OllamaResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

class OllamaService {
  private apiUrl: string;
  private model: string;

  constructor() {
    this.apiUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'gpt-oss:120b-cloud';
  }

  async chat(messages: OllamaMessage[]): Promise<string> {
    try {
      const response = await axios.post<OllamaResponse>(
        `${this.apiUrl}/api/chat`,
        {
          model: this.model,
          messages: messages,
          stream: false
        },
        {
          timeout: 120000 // 2 minute timeout for large models
        }
      );

      return response.data.message.content;
    } catch (error) {
      console.error('Ollama API Error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Ollama server is not running. Please start it with: ollama serve');
        }
        if (error.response?.status === 404) {
          throw new Error(`Model '${this.model}' not found. Please pull it with: ollama pull ${this.model}`);
        }
      }
      
      throw new Error('Failed to get response from Ollama AI');
    }
  }

  async generate(prompt: string): Promise<string> {
    return this.chat([
      {
        role: 'user',
        content: prompt
      }
    ]);
  }

  async chatWithContext(userMessage: string, systemContext: string): Promise<string> {
    return this.chat([
      {
        role: 'system',
        content: systemContext
      },
      {
        role: 'user',
        content: userMessage
      }
    ]);
  }

  // Check if Ollama is available
  async healthCheck(): Promise<boolean> {
    try {
      await axios.get(`${this.apiUrl}/api/tags`, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get available models
  async getModels(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/api/tags`);
      return response.data.models?.map((m: any) => m.name) || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  }
}

export const ollamaService = new OllamaService();
