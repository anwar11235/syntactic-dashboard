export interface QAPair {
  question: string;
  answer: string;
  metadata: {
    category: string;
    difficulty: string;
    avg_helpfulness_score: number;
  };
}

export interface ImageData {
  url: string;
  caption?: string;
}

export interface TextData {
  text: string;
  metadata: {
    sentiment: string;
    engagement_score: number;
  };
}

export interface EmbeddingData {
  vector: number[];
  metadata: {
    category: string;
    demographic: string;
  };
}

export interface DocumentData {
  title: string;
  preview: string;
  metadata?: Record<string, unknown>;
}

export type DatasetType = 'tabular' | 'image' | 'text' | 'document' | 'embedding' | 'qa';

export interface Dataset {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  provider: string;
  type: DatasetType;
  sampleData: any;
} 