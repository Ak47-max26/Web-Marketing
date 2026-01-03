import React from 'react';
import InfiniteMarquee from '../components/UI/InfiniteMarquee';
import { 
  GitHubLogo,
  NotionLogo,
  GoogleCalendarLogo,
  GmailLogo,
  SlackLogo,
  FigmaLogo,
  LinkedInLogo,
  GoogleDriveLogo,
  VSCodeLogo,
  SpotifyLogo
} from '../components/Logos';

// Logo Marquee Section Component
const LogoMarqueeSection = () => {
  const integrationTools = [
    { name: 'GitHub', icon: GitHubLogo },
    { name: 'Notion', icon: NotionLogo },
    { name: 'Google Calendar', icon: GoogleCalendarLogo },
    { name: 'Gmail', icon: GmailLogo },
    { name: 'Slack', icon: SlackLogo },
    { name: 'Figma', icon: FigmaLogo },
    { name: 'LinkedIn', icon: LinkedInLogo },
    { name: 'Google Drive', icon: GoogleDriveLogo },
    { name: 'VS Code', icon: VSCodeLogo },
    { name: 'Spotify', icon: SpotifyLogo }
  ];

  return (
    <>
      {/* INFINITE LOGO MARQUEE */}
      <section className="py-10 border-y border-zinc-200/50 bg-white/40 backdrop-blur-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Seamlessly integrates with your stack</p>
          </div>
          <InfiniteMarquee>
            {integrationTools.map((tool, i) => (
                <div key={i} className="mx-12 flex items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer group">
                    <tool.icon className="w-6 h-6 group-hover:text-orange-600 transition-colors" />
                    <span className="text-xl font-bold text-zinc-800 font-sans tracking-tight">{tool.name}</span>
                </div>
            ))}
          </InfiniteMarquee>
      </section>
    </>
  );
};

export default LogoMarqueeSection;
