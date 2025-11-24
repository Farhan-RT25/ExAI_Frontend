import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-3xl p-8 md:p-16 overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6">
                <Mail className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Start Your Free Trial</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Ready to Transform Your
                <br />
                <span className="text-primary">Email Management?</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of professionals who have already streamlined their workflow.
                Start your 14-day free trial today. No credit card required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 group"
                  asChild
                >
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 border-border hover:border-primary/50"
                  asChild
                >
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
