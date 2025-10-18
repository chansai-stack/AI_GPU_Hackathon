/**
 * Learn Hub - Article Library
 */

export type ArticleCategory = 'basics' | 'market' | 'procurement' | 'technology';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  description: string;
  content: string;
  readTime: number;
  difficulty: Difficulty;
  tags: string[];
  icon: string;
}

export const ARTICLES: Article[] = [
  // GPU Basics
  {
    id: 'what-is-gpu',
    title: 'What is a GPU?',
    category: 'basics',
    description: 'Understanding Graphics Processing Units and their role in AI/ML workloads',
    content: `# What is a GPU?

A Graphics Processing Unit (GPU) is a specialized electronic circuit designed to rapidly process and render graphics. In AI and machine learning, GPUs have become essential for training and running large models.

## Key Concepts

**Parallel Processing**: Unlike CPUs that excel at sequential tasks, GPUs can perform thousands of calculations simultaneously. This makes them ideal for matrix operations common in AI/ML.

**CUDA Cores**: NVIDIA GPUs contain thousands of CUDA cores - small processing units that work in parallel. An H100 has over 16,000 CUDA cores.

**Memory Bandwidth**: GPUs have extremely high memory bandwidth, allowing rapid data transfer between memory and processing cores.

## Why GPUs for AI?

- **Speed**: Train models 10-100x faster than CPUs
- **Efficiency**: Better performance per watt
- **Scale**: Handle massive datasets and model parameters

## Common Use Cases

1. **Training Large Language Models** (GPT, Claude, etc.)
2. **Computer Vision** (Image recognition, video analysis)
3. **Scientific Computing** (Climate modeling, drug discovery)
4. **Recommendation Systems** (E-commerce, streaming)`,
    readTime: 5,
    difficulty: 'beginner',
    tags: ['GPU', 'Basics', 'AI', 'Hardware'],
    icon: '🎓',
  },
  {
    id: 'h100-vs-a100',
    title: 'H100 vs A100 vs L40S: GPU Comparison',
    category: 'basics',
    description: 'Comprehensive comparison of NVIDIA\'s most popular datacenter GPUs',
    content: `# H100 vs A100 vs L40S: Which GPU is Right for You?

Choosing the right GPU depends on your workload, budget, and timeline. Here's a breakdown of NVIDIA's most popular options.

## H100 (Hopper Architecture)

**Best for**: Large language models, cutting-edge AI research

**Key Specs**:
- 80GB HBM3 memory
- 3TB/s memory bandwidth
- 4th Gen Tensor Cores
- Transformer Engine

**Pricing**: ~$4.00-5.00/hr
**Availability**: Limited, high demand

## A100 (Ampere Architecture)

**Best for**: Production ML workloads, stable deployments

**Key Specs**:
- 40GB or 80GB HBM2e
- 2TB/s memory bandwidth
- 3rd Gen Tensor Cores

**Pricing**: ~$2.50-3.50/hr
**Availability**: Good across providers

## L40S (Ada Lovelace)

**Best for**: Inference, graphics + AI hybrid workloads

**Key Specs**:
- 48GB GDDR6
- AI TensorRT optimization
- Ray tracing capabilities

**Pricing**: ~$1.50-2.50/hr
**Availability**: Excellent

## Decision Matrix

**Choose H100 if**: Training 100B+ parameter models, need cutting-edge performance
**Choose A100 if**: Balanced performance/cost, production workloads
**Choose L40S if**: Primarily inference, budget-conscious, hybrid workloads`,
    readTime: 8,
    difficulty: 'intermediate',
    tags: ['H100', 'A100', 'L40S', 'Comparison'],
    icon: '⚖️',
  },

  // Market Dynamics
  {
    id: 'gpu-pricing-explained',
    title: 'How GPU Pricing Works',
    category: 'market',
    description: 'Understanding the factors that drive GPU rental prices and market dynamics',
    content: `# How GPU Pricing Works

GPU pricing in the cloud is influenced by multiple interconnected factors. Understanding these helps you make better procurement decisions.

## Supply and Demand

**Primary Driver**: Like any market, GPU prices follow supply and demand. When demand exceeds supply, prices rise rapidly.

**Demand Factors**:
- AI/ML training cycles (often quarterly)
- New model releases (ChatGPT, Claude, etc.)
- Academic research deadlines
- Corporate budget cycles

**Supply Factors**:
- NVIDIA production capacity
- Hyperscaler purchases (Google, Microsoft, Meta)
- Manufacturing constraints
- Chip allocation policies

## Pricing Models

**On-Demand**: Pay-per-hour, highest flexibility, highest cost

**Reserved**: Commit to duration, get 20-40% discount

**Spot**: Bid on unused capacity, save 50-90%, can be interrupted

## Price Volatility

GPU prices can swing 20-30% within weeks due to:
- Major product announcements
- Supply chain disruptions
- Hyperscaler capacity releases
- Market sentiment shifts

## Geographic Pricing

Different regions have different pricing:
- **US-East**: Often cheapest (highest supply)
- **US-West**: Moderate pricing
- **EU**: Typically 10-20% higher
- **APAC**: Variable, often premium`,
    readTime: 7,
    difficulty: 'intermediate',
    tags: ['Pricing', 'Market', 'Economics'],
    icon: '💰',
  },

  // Procurement Strategies
  {
    id: 'when-to-buy-vs-wait',
    title: 'When to Buy GPUs vs Wait',
    category: 'procurement',
    description: 'Strategic timing guidance for GPU procurement decisions',
    content: `# When to Buy vs Wait: Strategic Timing

Timing your GPU purchases can save 20-40% on costs. Here's how to decide.

## Buy Now If:

✅ **Prices are trending down** (check 30-day average)
✅ **You have immediate project deadlines**
✅ **Supply is abundant** (high availability)
✅ **You can lock favorable rates** (below historical average)
✅ **Major announcements pending** (prices may surge)

## Wait If:

⏸️ **Prices trending up rapidly** (likely to correct)
⏸️ **New hardware releasing soon** (H200, B100)
⏸️ **No immediate deadlines** (flexibility = better prices)
⏸️ **Market overheated** (temperature > 90/100)
⏸️ **Low supply** (prices will stay high)

## Decision Framework

**Step 1: Check Market Temperature**
- Above 85: Consider waiting
- 70-85: Normal procurement
- Below 70: Excellent buying opportunity

**Step 2: Assess Timeline**
- Urgent (< 2 weeks): Buy at market
- Moderate (1-2 months): Wait for dip
- Flexible (3+ months): Optimal timing

**Step 3: Monitor Trends**
- 7-day price trend
- Provider capacity additions
- Upcoming product announcements

## Pro Tips

- Set price alerts at target levels
- Have backup providers identified
- Consider rate locking when < 10% above 90-day average
- Build 2-week buffer in project timelines`,
    readTime: 6,
    difficulty: 'intermediate',
    tags: ['Strategy', 'Timing', 'Procurement'],
    icon: '⏰',
  },

  // Technology
  {
    id: 'h200-what-to-expect',
    title: 'H200 Release: What to Expect',
    category: 'technology',
    description: 'Analysis of NVIDIA H200 release and market impact',
    content: `# H200 Release: What to Expect

NVIDIA's H200 represents the next evolution in datacenter GPUs. Here's what you need to know.

## Key Improvements

**Memory**: 141GB HBM3e (vs 80GB on H100)
**Bandwidth**: 4.8TB/s (vs 3TB/s)
**Performance**: ~50% faster inference, 30% faster training

## Release Timeline

**Initial Availability**: Q4 2025 (limited)
**General Availability**: Q2 2026
**Cloud Provider Access**: Q1 2026 (AWS, GCP, Azure)

## Pricing Predictions

**Launch**: $6-8/hr (premium pricing)
**3 Months**: $5-6/hr (stabilization)
**6 Months**: $4-5/hr (normalized)

## Impact on H100 Market

**Immediate**: H100 prices may spike (panic buying)
**3 Months**: H100 prices decline 10-15%
**6 Months**: H100 becomes mid-tier option

## Strategic Recommendations

**If you need GPUs now**: Lock H100 rates before H200 announcement

**If timeline is flexible**: Wait for H200 initial price drop (3-6 months post-launch)

**If budget-conscious**: H100 will offer best value in 2026

## Migration Planning

Most workloads will see immediate benefits from H200's memory:
- Larger model training
- Higher batch sizes
- Faster inference throughput

Plan migration for memory-bound workloads first.`,
    readTime: 7,
    difficulty: 'advanced',
    tags: ['H200', 'Future', 'Technology', 'Planning'],
    icon: '🚀',
  },

  // Additional Articles (shorter versions for demo)
  {
    id: 'cloud-providers-compared',
    title: 'Cloud GPU Providers: Complete Comparison',
    category: 'market',
    description: 'AWS, GCP, Azure, Vast.ai, Lambda Labs - which provider is right for you?',
    content: `# Cloud GPU Providers Compared\n\nComprehensive comparison of major GPU cloud providers...\n\n[Full article content here]`,
    readTime: 10,
    difficulty: 'intermediate',
    tags: ['Providers', 'Comparison', 'Cloud'],
    icon: '☁️',
  },
  {
    id: 'building-gpu-budget',
    title: 'Building a GPU Infrastructure Budget',
    category: 'procurement',
    description: 'Step-by-step guide to estimating and planning GPU costs',
    content: `# Building a GPU Budget\n\nComplete guide to GPU budget planning...\n\n[Full article content here]`,
    readTime: 12,
    difficulty: 'intermediate',
    tags: ['Budget', 'Planning', 'Finance'],
    icon: '💵',
  },
  {
    id: 'rate-locking-strategies',
    title: 'Rate Locking Strategies That Work',
    category: 'procurement',
    description: 'When and how to lock GPU rates for maximum savings',
    content: `# Rate Locking Strategies\n\nAdvanced strategies for locking GPU rates...\n\n[Full article content here]`,
    readTime: 9,
    difficulty: 'advanced',
    tags: ['Strategy', 'Rates', 'Advanced'],
    icon: '🔒',
  },
];

export const getCategoryCounts = () => {
  return {
    all: ARTICLES.length,
    basics: ARTICLES.filter(a => a.category === 'basics').length,
    market: ARTICLES.filter(a => a.category === 'market').length,
    procurement: ARTICLES.filter(a => a.category === 'procurement').length,
    technology: ARTICLES.filter(a => a.category === 'technology').length,
  };
};

export const getArticlesByCategory = (category: ArticleCategory | 'all') => {
  if (category === 'all') return ARTICLES;
  return ARTICLES.filter(a => a.category === category);
};

export const getArticleById = (id: string) => {
  return ARTICLES.find(a => a.id === id);
};
