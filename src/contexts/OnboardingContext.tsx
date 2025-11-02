import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EmailAccount {
  address: string;
  provider: 'google' | 'microsoft' | 'zoho';
  type: 'work' | 'personal';
  validated: boolean;
}

interface UserAnswers {
  role: string;
  industry: string;
  emailVolume: string;
  communicationStyle: string;
  emailsTo: string;
}

interface OnboardingContextType {
  // User data
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  
  // Email accounts
  emailAccounts: EmailAccount[];
  setEmailAccounts: (accounts: EmailAccount[]) => void;
  
  // User answers
  userAnswers: UserAnswers;
  setUserAnswers: (answers: UserAnswers) => void;
  
  // Selected categories
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  
  // Reset
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    role: '',
    industry: '',
    emailVolume: '',
    communicationStyle: '',
    emailsTo: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const resetOnboarding = () => {
    setFullName('');
    setEmail('');
    setEmailAccounts([]);
    setUserAnswers({
      role: '',
      industry: '',
      emailVolume: '',
      communicationStyle: '',
      emailsTo: '',
    });
    setSelectedCategories([]);
  };

  return (
    <OnboardingContext.Provider
      value={{
        fullName,
        setFullName,
        email,
        setEmail,
        emailAccounts,
        setEmailAccounts,
        userAnswers,
        setUserAnswers,
        selectedCategories,
        setSelectedCategories,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
