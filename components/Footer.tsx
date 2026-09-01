import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full relative z-10 bg-white/40 backdrop-blur-3xl border-t border-white/60 shadow-[0_-4px_40px_rgba(34,7,73,0.02),inset_0_1px_0_rgba(255,255,255,0.6)] antialiased overflow-hidden">
      
      {/* Subtle Bottom Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-genx-primary/5 blur-[80px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* Column 1: GenXCode Core */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <Link 
              href="https://genxcode.cosmolix.co.in" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 mb-6 active:scale-95 transition-all duration-300"
            >
              <Image 
                src="/icon.svg" 
                alt="GenXCode Logo" 
                width={36} 
                height={36} 
                className="drop-shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
              />
              <span className="text-xl font-heading font-bold tracking-tight text-genx-dark group-hover:text-genx-primary transition-colors duration-300">
                GenXCode
              </span>
            </Link>
            <p className="text-gray-500 font-body font-medium leading-relaxed max-w-md">
              <Link href="https://genxcode.cosmolix.co.in" target="_blank" className="font-bold text-genx-dark hover:text-genx-primary transition-colors">GenXCode</Link> is a high-performance, developer-first ecosystem built to empower the next generation of software engineers with cutting-edge tools and resources.
            </p>
          </div>

          {/* Column 2: The Fund */}
          <div className="md:col-span-4 flex flex-col items-start text-left">
            <h4 className="text-lg font-heading font-bold text-genx-dark tracking-tight mb-6">
              Developers Fund
            </h4>
            <p className="text-gray-500 font-body font-medium leading-relaxed max-w-sm">
              This fund exists with a dual mandate: to sustainably maintain and scale the core GenXCode cloud architecture, and to provide direct financial grants for brilliant students participating in national Hackathons.
            </p>
          </div>

          {/* Column 3: Corporate & Connect */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right">
            <h4 className="text-lg font-heading font-bold text-genx-dark tracking-tight mb-6">
              Connect With Us
            </h4>
            
            {/* Engineered Social Pills */}
            <div className="flex items-center gap-3 mb-8">
              {/* Instagram */}
              <Link href="#" className="w-10 h-10 rounded-full bg-white/60 border border-gray-200/60 flex items-center justify-center text-gray-500 hover:text-[#E1306C] hover:bg-white hover:border-[#E1306C]/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              
              {/* LinkedIn */}
              <Link href="#" className="w-10 h-10 rounded-full bg-white/60 border border-gray-200/60 flex items-center justify-center text-gray-500 hover:text-[#0A66C2] hover:bg-white hover:border-[#0A66C2]/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>

              {/* WhatsApp */}
              <Link href="#" className="w-10 h-10 rounded-full bg-white/60 border border-gray-200/60 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:bg-white hover:border-[#25D366]/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
                </svg>
              </Link>
            </div>

            <div className="text-sm text-gray-500 font-body font-medium">
              An initiative by{' '}
              <Link 
                href="https://cosmolix.co.in" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-genx-dark hover:text-genx-primary transition-colors relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-[1px] after:bg-genx-primary/30 hover:after:bg-genx-primary"
              >
                Cosmolix
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-body font-medium">
            &copy; {new Date().getFullYear()}{' '}
            <Link href="https://genxcode.cosmolix.co.in" target="_blank" className="hover:text-genx-dark transition-colors">GenXCode</Link>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 font-body font-medium">
            <Link href="#" className="hover:text-genx-dark transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-genx-dark transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}