import React, { useState } from 'react';
import { MarketingShell } from './layout/MarketingShell';
import { MarketingOverview } from './pages/MarketingOverview';
import { CampaignManagement } from './pages/CampaignManagement';
import { CampaignDetail } from './pages/CampaignDetail';
import { LeadManagement } from './pages/LeadManagement';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { SocialMedia } from './pages/SocialMedia';
import { SeoAnalytics } from './pages/SeoAnalytics';
import { ContentManagement } from './pages/ContentManagement';
import { EmailMarketing } from './pages/EmailMarketing';
import { AdsManagement } from './pages/AdsManagement';
import { AudienceInsights } from './pages/AudienceInsights';
import { TeamCollaboration } from './pages/TeamCollaboration';
import { ApprovalWorkflow } from './pages/ApprovalWorkflow';
import { Notifications } from './pages/Notifications';
import { AIMarketing } from './pages/AIMarketing';
import { Settings } from './pages/Settings';
import { ComingSoon } from './pages/ComingSoon';
import { LMSView } from '../hr/components/LMSView';


export const MarketingManagerModule: React.FC<{ user: any }> = ({ user }) => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <MarketingOverview />;
      case 'campaigns':
        return <CampaignManagement setView={setActiveView} />;
      case 'campaign_detail':
        return <CampaignDetail setView={setActiveView} />;
      case 'leads':
        return <LeadManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'social':
        return <SocialMedia />;
      case 'seo':
        return <SeoAnalytics />;
      case 'content':
        return <ContentManagement />;
      case 'email':
        return <EmailMarketing />;
      case 'ads':
        return <AdsManagement />;
      case 'audience':
        return <AudienceInsights />;
      case 'team':
        return <TeamCollaboration />;
      case 'approval':
        return <ApprovalWorkflow />;
      case 'notifications':
        return <Notifications />;
      case 'ai':
        return <AIMarketing />;
      case 'training': return <LMSView />;
      case 'settings':
        return <Settings />;
      default:
        return <ComingSoon activeView={activeView} setView={setActiveView} />;
    }
  };

  return (
    <MarketingShell activeView={activeView} setActiveView={setActiveView}>
      {renderContent()}
    </MarketingShell>
  );
};
