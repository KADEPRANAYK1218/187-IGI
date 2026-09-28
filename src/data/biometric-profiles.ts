export interface BiometricProfile {
  serviceId: string;
  irisPatternHash: string;
  irisScanQualityScore: number;
  face3DLandmarkCount: number;
  faceDepthVectorConfidence: number;
  faceNeuralEmbeddingHash: string;
  faceThermalVascularScore: number;
  faceCraniofacialRatio: number;
  voicePassphrase: string;
  voiceFrequencyHz: [number, number];
  voiceConfidenceThreshold: number;
}

export const BIOMETRIC_VERIFICATION_PHRASE = "VAJRA BHARAT COMMAND ALPHA NINE";

export const BIOMETRIC_PROFILES: Record<string, BiometricProfile> = {
  'IC-7K42P9': {
    serviceId: 'IC-7K42P9',
    irisPatternHash: 'IRIS_SHA256_7K42P9_OCTANT_B4',
    irisScanQualityScore: 98.4,
    face3DLandmarkCount: 468,
    faceDepthVectorConfidence: 99.1,
    faceNeuralEmbeddingHash: 'NEURAL_128D_7K42P9_SIGMA_984',
    faceThermalVascularScore: 98.7,
    faceCraniofacialRatio: 1.618,
    voicePassphrase: BIOMETRIC_VERIFICATION_PHRASE,
    voiceFrequencyHz: [110, 240],
    voiceConfidenceThreshold: 94.5
  },
  'IN-8P31XZ': {
    serviceId: 'IN-8P31XZ',
    irisPatternHash: 'IRIS_SHA256_8P31XZ_OCTANT_C2',
    irisScanQualityScore: 97.8,
    face3DLandmarkCount: 468,
    faceDepthVectorConfidence: 98.6,
    faceNeuralEmbeddingHash: 'NEURAL_128D_8P31XZ_SIGMA_976',
    faceThermalVascularScore: 97.9,
    faceCraniofacialRatio: 1.622,
    voicePassphrase: BIOMETRIC_VERIFICATION_PHRASE,
    voiceFrequencyHz: [180, 310],
    voiceConfidenceThreshold: 93.8
  },
  'IAF-92LX5C': {
    serviceId: 'IAF-92LX5C',
    irisPatternHash: 'IRIS_SHA256_92LX5C_OCTANT_A1',
    irisScanQualityScore: 99.2,
    face3DLandmarkCount: 468,
    faceDepthVectorConfidence: 99.5,
    faceNeuralEmbeddingHash: 'NEURAL_128D_92LX5C_SIGMA_992',
    faceThermalVascularScore: 99.3,
    faceCraniofacialRatio: 1.614,
    voicePassphrase: BIOMETRIC_VERIFICATION_PHRASE,
    voiceFrequencyHz: [120, 260],
    voiceConfidenceThreshold: 96.2
  }
};

export function getOrCreateBiometricProfile(serviceId: string): BiometricProfile {
  if (BIOMETRIC_PROFILES[serviceId]) {
    return BIOMETRIC_PROFILES[serviceId];
  }

  // Generate deterministic synthetic profile for all synthetic demo and newly registered officer IDs
  const cleanId = serviceId.replace('-', '').toUpperCase();
  return {
    serviceId,
    irisPatternHash: `IRIS_SHA256_${cleanId}_SYNTH`,
    irisScanQualityScore: 96.8,
    face3DLandmarkCount: 468,
    faceDepthVectorConfidence: 97.5,
    faceNeuralEmbeddingHash: `NEURAL_128D_${cleanId}_SIGMA_972`,
    faceThermalVascularScore: 97.4,
    faceCraniofacialRatio: 1.618,
    voicePassphrase: BIOMETRIC_VERIFICATION_PHRASE,
    voiceFrequencyHz: [130, 270],
    voiceConfidenceThreshold: 92.5
  };
}
