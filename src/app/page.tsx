import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SectorCard } from '@/components/SectorCard';
import { 
  Cpu, 
  Leaf, 
  Heart, 
  DollarSign, 
  Zap, 
  CircuitBoard 
} from 'lucide-react';

export default function HomePage() {
  const sectors = [
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: 'AI & Robotics',
      change: 15.3,
      description: 'Leading AI computing, autonomous systems, and machine learning companies.',
      href: '/sectors?category=AI+%26+Robotics'
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: 'Green Energy',
      change: 12.7,
      description: 'Solar, wind, and renewable energy companies driving sustainability.',
      href: '/sectors?category=Green+Energy'
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: 'Healthcare Tech',
      change: 10.2,
      description: 'Medical devices, telemedicine, and healthcare innovation leaders.',
      href: '/sectors?category=Healthcare+Tech'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
      title: 'Fintech',
      change: 8.9,
      description: 'Digital payments, banking, and financial technology disruptors.',
      href: '/sectors?category=Fintech'
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: 'Electric Vehicles',
      change: 14.5,
      description: 'EV manufacturers and charging infrastructure companies.',
      href: '/sectors?category=Electric+Vehicles'
    },
    {
      icon: <CircuitBoard className="w-8 h-8 text-indigo-500" />,
      title: 'Semiconductors',
      change: 11.8,
      description: 'Chip manufacturers powering AI, computing, and mobile devices.',
      href: '/sectors?category=Semiconductors'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <Hero />

      {/* Top Performing Sectors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Top Performing Sectors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore high-growth sectors and discover emerging opportunities
            </p>
          </div>

          {/* Sector Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <SectorCard
                key={sector.title}
                {...sector}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to make smarter investment decisions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Try our AI-powered chatbot for personalized stock recommendations
          </p>
          <a
            href="/chatbot"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Chat with AI Advisor
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2025 InvestorIQ. Built with Next.js, Yahoo Finance, and Ollama AI.</p>
        </div>
      </footer>
    </div>
  );
}
