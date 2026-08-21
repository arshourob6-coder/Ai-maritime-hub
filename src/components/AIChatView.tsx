import React from 'react';
import { AIMaritimeCopilotPro } from './AIMaritimeCopilotPro';
import { PlanType, Currency } from '../types';

interface AIChatViewProps {
  initialPrompt?: string;
  userPlan?: PlanType;
  currency?: Currency;
  onOpenPricing?: () => void;
}

export const AIChatView: React.FC<AIChatViewProps> = (props) => {
  return <AIMaritimeCopilotPro {...props} />;
};

export { AIMaritimeCopilotPro };
