// src/sanity/lib/validateEnv.ts

export function validateEnvironment() {
  const requiredVars = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'NEXT_PUBLIC_SANITY_API_VERSION',
    'SANITY_ACCESS_TOKEN'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('Environment Variable Error:', {
      missingVariables: missingVars,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
    
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  // Validate API version format
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(apiVersion || '')) {
    throw new Error(
      'Invalid API version format. Expected YYYY-MM-DD format.'
    );
  }

  return true;
}

// Add a function to validate specific Sanity configuration
export function validateSanityConfig(config: {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
}) {
  const { projectId, dataset, apiVersion } = config;

  if (!projectId || !dataset || !apiVersion) {
    throw new Error('Invalid Sanity configuration: missing required fields');
  }

  return true;
}
    