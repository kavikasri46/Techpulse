const initialCategories = [
  {
    _id: 'cat_01',
    name: 'Software Development',
    slug: 'software-development',
    description: 'Best practices, software engineering design patterns, system architecture, and modern programming paradigms.',
    color: '#0284c7'
  },
  {
    _id: 'cat_02',
    name: 'Artificial Intelligence & Machine Learning',
    slug: 'artificial-intelligence-machine-learning',
    description: 'LLMs, generative models, autonomous agents, neural architectures, and data engineering.',
    color: '#7c3aed'
  },
  {
    _id: 'cat_03',
    name: 'Web and Mobile App Development',
    slug: 'web-and-mobile-app-development',
    description: 'Modern frontend frameworks, cross-platform mobile apps, performance optimization, and responsive design.',
    color: '#059669'
  },
  {
    _id: 'cat_04',
    name: 'Technology & Innovation',
    slug: 'technology-innovation',
    description: 'Emerging tech horizons, quantum breakthroughs, spatial computing, and next-gen hardware.',
    color: '#d97706'
  },
  {
    _id: 'cat_05',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Zero trust security, threat intelligence, vulnerability mitigation, and cryptographic protocols.',
    color: '#dc2626'
  },
  {
    _id: 'cat_06',
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    description: 'Cloud native architectures, Kubernetes, serverless paradigms, and DevOps infrastructure as code.',
    color: '#2563eb'
  },
  {
    _id: 'cat_07',
    name: 'Industry Insights',
    slug: 'industry-insights',
    description: 'Technology leadership, remote engineering culture, developer productivity, and industry market analysis.',
    color: '#4f46e5'
  }
];

const initialAuthors = [
  {
    _id: 'auth_01',
    name: 'Alex Vance',
    title: 'Principal Software Architect',
    bio: 'Alex Vance is a distributed systems engineer with 14+ years of experience building fault-tolerant cloud backends and developer platforms.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: 'alex.vance@techpulse.io',
    socialLinks: {
      twitter: 'https://twitter.com/alexvance_dev',
      linkedin: 'https://linkedin.com/in/alexvance',
      github: 'https://github.com/alexvance'
    }
  },
  {
    _id: 'auth_02',
    name: 'Priya Sharma',
    title: 'Head of AI Research',
    bio: 'Priya leads AI & Machine Learning research initiatives focusing on multi-agent systems and real-time model inference pipelines.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    email: 'priya.sharma@techpulse.io',
    socialLinks: {
      twitter: 'https://twitter.com/priyasharma_ai',
      linkedin: 'https://linkedin.com/in/priyasharma-ai',
      github: 'https://github.com/priyasharma'
    }
  },
  {
    _id: 'auth_03',
    name: 'Marcus Chen',
    title: 'Senior Staff Infrastructure Engineer',
    bio: 'Marcus specializes in Kubernetes orchestrations, Zero Trust enterprise perimeter designs, and large-scale cloud cost engineering.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    email: 'marcus.chen@techpulse.io',
    socialLinks: {
      twitter: 'https://twitter.com/marcuschen_infra',
      linkedin: 'https://linkedin.com/in/marcuschen',
      github: 'https://github.com/marcuschen'
    }
  }
];

const initialPosts = [
  {
    _id: 'post_01',
    title: 'Clean Architecture in Modern Node.js and TypeScript Applications',
    slug: 'clean-architecture-in-modern-nodejs-and-typescript-applications',
    shortDescription: 'Learn how to decouple your domain entities, use cases, and persistence layers in Node.js enterprise systems for maximum testability.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80',
    category: 'cat_01',
    author: 'auth_01',
    tags: ['Node.js', 'TypeScript', 'Clean Architecture', 'System Design'],
    readingTime: '6 min read',
    status: 'published',
    isFeatured: true,
    views: 1420,
    publishedAt: new Date('2026-10-15T09:00:00Z'),
    seoTitle: 'Clean Architecture in Modern Node.js: A Practical Guide',
    metaDescription: 'A comprehensive guide on applying Uncle Bob\'s Clean Architecture principles to Node.js and TypeScript web applications.',
    content: `
<h2>Why Architecture Matters in Long-Lived Node Services</h2>
<p>As enterprise codebases scale, coupling between database drivers, HTTP frameworks, and business rules often leads to brittle, unmaintainable monoliths. Uncle Bob's <strong>Clean Architecture</strong> provides a disciplined blueprint to isolate your high-value business logic from external infrastructure concerns.</p>

<p>In this guide, we break down the 4 concentric rings of Clean Architecture and demonstrate how to wire them together gracefully using dependency inversion.</p>

<h2>The 4 Architectural Layers</h2>
<p>Clean architecture structures the codebase such that dependencies point strictly inward toward pure business logic:</p>
<ul>
  <li><strong>Entities:</strong> Core enterprise business concepts, types, and invariant rules.</li>
  <li><strong>Use Cases:</strong> Application-specific business rules orchestration (e.g., <code>CreateUserUseCase</code>, <code>PublishBlogPostUseCase</code>).</li>
  <li><strong>Interface Adapters:</strong> Controllers, Presenters, and Gateways translating data between use cases and external formats.</li>
  <li><strong>Frameworks & Drivers:</strong> Express / Fastify web server, MongoDB / PostgreSQL repositories, external API SDKs.</li>
</ul>

<h2>Practical Code Example: Defining the Use Case Layer</h2>
<p>Here is an illustrative TypeScript implementation demonstrating how the use case depends purely on an abstract repository interface rather than a direct database driver:</p>

<pre><code class="language-typescript">
// Core Domain Interface
export interface IPostRepository {
  findById(id: string): Promise&lt;Post | null&gt;;
  save(post: Post): Promise&lt;void&gt;;
}

// Application Use Case
export class PublishPostUseCase {
  constructor(private postRepo: IPostRepository) {}

  async execute(postId: string): Promise&lt;Post&gt; {
    const post = await this.postRepo.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    // Domain invariant execution
    post.publish();
    await this.postRepo.save(post);
    return post;
  }
}
</code></pre>

<h2>Architecture Comparison</h2>
<table>
  <thead>
    <tr>
      <th>Dimension</th>
      <th>Traditional MVC</th>
      <th>Clean Architecture</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Business Logic Location</td>
      <td>Scattered in Fat Models & Controllers</td>
      <td>Encapsulated in Pure Use Cases</td>
    </tr>
    <tr>
      <td>Database Swap Effort</td>
      <td>Requires massive rewriting</td>
      <td>Implement new repository adapter only</td>
    </tr>
    <tr>
      <td>Unit Testing</td>
      <td>Requires heavy mocking / DB fixtures</td>
      <td>Fast in-memory mock repositories</td>
    </tr>
  </tbody>
</table>

<blockquote>
  "Good architecture makes the system easy to understand, easy to develop, easy to maintain, and easy to deploy. The ultimate goal is to minimize the lifetime cost of the system."
</blockquote>

<h2>Key Takeaways</h2>
<p>Adopting clean architecture requires upfront investment in interface definitions and directory structuring, but repays manifold when microservice boundaries shift or storage technologies evolve.</p>
`
  },
  {
    _id: 'post_02',
    title: 'The Rise of Autonomous AI Agents: Architectures, Capabilities, and Industry Reality',
    slug: 'the-rise-of-autonomous-ai-agents-architectures-capabilities-and-industry-reality',
    shortDescription: 'From reactive chat models to goal-driven autonomous systems: an analytical deep dive into modern LLM agent orchestration and safety bounds.',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    category: 'cat_02',
    author: 'auth_02',
    tags: ['AI', 'Autonomous Agents', 'LLMs', 'Machine Learning'],
    readingTime: '8 min read',
    status: 'published',
    isFeatured: true,
    views: 2890,
    publishedAt: new Date('2026-10-22T11:30:00Z'),
    seoTitle: 'Autonomous AI Agents Architecture & Enterprise Reality (2026)',
    metaDescription: 'Explore the internal mechanics of autonomous AI agents, multi-agent frameworks, tool usage protocols, and state management.',
    content: `
<h2>The Shift From Prompt-Response to Goal-Oriented Loops</h2>
<p>Early iterations of large language models functioned primarily as static single-turn or conversational assistants. In contrast, <strong>autonomous AI agents</strong> combine reasoning models with stateful memory, external tool calling, and recursive reflection loops to pursue multi-step goals with minimal human intervention.</p>

<h2>The Four Pillars of Agentic Systems</h2>
<p>Every modern agent architecture relies on four foundational components:</p>
<ol>
  <li><strong>Planning & Task Decomposition:</strong> Breaking high-level objectives into granular, verifiable sub-tasks.</li>
  <li><strong>Contextual & Long-term Memory:</strong> Leveraging vector stores and conversation transcripts for episodic recall.</li>
  <li><strong>Tool Integration:</strong> Standardized protocols (such as Model Context Protocol - MCP) for executing terminal commands, API calls, and browser automations.</li>
  <li><strong>Self-Correction & Verification:</strong> Evaluating intermediate execution outputs and replanning when encountering roadblocks.</li>
</ol>

<h2>The Agent Loop in Code</h2>
<pre><code class="language-javascript">
async function runAgentLoop(goal, tools, memory) {
  let state = { goal, stepsTaken: [], status: 'IN_PROGRESS' };
  
  while (state.status === 'IN_PROGRESS') {
    const nextAction = await planner.decideNextStep(state, tools);
    
    if (nextAction.type === 'FINISH') {
      state.status = 'COMPLETED';
      return nextAction.summary;
    }
    
    // Execute tool in secure sandbox
    const toolResult = await executeTool(nextAction.tool, nextAction.params);
    state.stepsTaken.push({ action: nextAction, result: toolResult });
    
    // Self-verification phase
    await memory.recordStep(state.stepsTaken[state.stepsTaken.length - 1]);
  }
}
</code></pre>

<h2>Enterprise Challenges</h2>
<p>While theoretical agent demos look impressive, enterprise adoption demands deterministic guardrails, rigorous prompt security, and strict cost controls around context window tokens.</p>
`
  },
  {
    _id: 'post_03',
    title: 'Zero Trust Architecture Explained: Practical Implementation Strategies for Enterprise Teams',
    slug: 'zero-trust-architecture-explained-practical-implementation-strategies',
    shortDescription: 'Perimeter-based defense is obsolete. Learn the three core tenets of Zero Trust: verify explicitly, least privilege, and assume breach.',
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80',
    category: 'cat_05',
    author: 'auth_03',
    tags: ['Cybersecurity', 'Zero Trust', 'DevSecOps', 'Cloud Security'],
    readingTime: '7 min read',
    status: 'published',
    isFeatured: true,
    views: 1980,
    publishedAt: new Date('2026-10-28T14:15:00Z'),
    seoTitle: 'Zero Trust Architecture: Practical Implementation Guide',
    metaDescription: 'A comprehensive engineering guide to migrating legacy corporate networks to modern Zero Trust architecture.',
    content: `
<h2>The Demise of the Castle-and-Moat Security Model</h2>
<p>The traditional perimeter security model operated on a straightforward assumption: anything outside the corporate network was untrusted, while anything inside the VPN was implicitly trusted. The reality of hybrid work, multi-cloud hosting, and advanced persistent threats (APTs) has rendered this model obsolete.</p>

<p><strong>Zero Trust</strong> operates under a radically different premise: <em>"Never trust, always verify."</em> Every request—regardless of whether it originates inside the office LAN or from a coffee shop halfway across the globe—must be authenticated, authorized, and encrypted before granting access.</p>

<h2>The 3 Core Pillars of Zero Trust</h2>
<ul>
  <li><strong>1. Verify Explicitly:</strong> Authenticate and authorize based on all available data points including user identity, device posture, location, firmware status, and anomaly detection.</li>
  <li><strong>2. Use Least-Privileged Access:</strong> Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA) models, risk-based adaptive policies, and data protection.</li>
  <li><strong>3. Assume Breach:</strong> Minimize blast radius through network micro-segmentation, end-to-end encryption, and continuous threat monitoring.</li>
</ul>

<h2>Network Microsegmentation Checklist</h2>
<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Legacy Approach</th>
      <th>Zero Trust Approach</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Identity</td>
      <td>Static LDAP password</td>
      <td>FIDO2 Hardware MFA + Device Attestation</td>
    </tr>
    <tr>
      <td>Network</td>
      <td>Broad VPN subnets</td>
      <td>Identity-Aware Proxies & mTLS tunnels</td>
    </tr>
    <tr>
      <td>Workload</td>
      <td>Unrestricted east-west traffic</td>
      <td>Kubernetes NetworkPolicies & Service Mesh mTLS</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    _id: 'post_04',
    title: 'Mastering Kubernetes Multi-Cluster Management and Edge Deployment Patterns',
    slug: 'mastering-kubernetes-multi-cluster-management-and-edge-deployment-patterns',
    shortDescription: 'Discover how modern platform teams use GitOps, ArgoCD, and Cilium service meshes to manage fleet-wide Kubernetes clusters across multiple clouds.',
    featuredImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1400&q=80',
    category: 'cat_06',
    author: 'auth_03',
    tags: ['Kubernetes', 'Cloud Computing', 'GitOps', 'DevOps'],
    readingTime: '5 min read',
    status: 'published',
    isFeatured: false,
    views: 890,
    publishedAt: new Date('2026-11-01T08:00:00Z'),
    seoTitle: 'Kubernetes Multi-Cluster Management & Edge Patterns',
    metaDescription: 'Techniques for managing hundreds of Kubernetes clusters across regions and edge environments using GitOps and eBPF meshes.',
    content: `
<h2>The Scaling Paradox of Kubernetes Fleets</h2>
<p>While deploying a single Kubernetes cluster is straightforward, managing 50 or 500 clusters spread across AWS, GCP, on-premise hardware, and edge locations creates severe configuration drift, observability gaps, and policy fragmentation.</p>

<h2>The GitOps Control Plane</h2>
<p>By treating declarative Git repositories as the single source of truth, teams use tools like <strong>ArgoCD</strong> and <strong>Flux</strong> to guarantee that all clusters continuously converge toward their intended configuration state.</p>

<pre><code class="language-yaml">
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: fleet-monitoring
  namespace: argocd
spec:
  generators:
    - clusters:
        selector:
          matchLabels:
            environment: production
  template:
    metadata:
      name: '{{name}}-prometheus'
    spec:
      project: default
      source:
        repoURL: 'https://github.com/company/infra-manifests.git'
        targetRevision: HEAD
        path: monitoring/prometheus
      destination:
        server: '{{server}}'
        namespace: monitoring
</code></pre>

<h2>Networking Across Clouds with eBPF and Cilium Mesh</h2>
<p>Standard kube-proxy relies on iptables, which degrades under thousands of services. By switching to Cilium with eBPF, platform engineers achieve sub-millisecond multi-cluster service discovery with transparent wire encryption.</p>
`
  },
  {
    _id: 'post_05',
    title: 'Building Resilient Offline-First Mobile Apps with React Native and Local State Sync',
    slug: 'building-resilient-offline-first-mobile-apps-with-react-native-and-local-state-sync',
    shortDescription: 'How to build mobile experiences that feel instantaneous, handle flaky networks seamlessly, and reconcile conflicts using CRDTs.',
    featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80',
    category: 'cat_03',
    author: 'auth_01',
    tags: ['React Native', 'Mobile Development', 'Offline First', 'Frontend'],
    readingTime: '6 min read',
    status: 'published',
    isFeatured: false,
    views: 1120,
    publishedAt: new Date('2026-11-03T10:00:00Z'),
    seoTitle: 'Offline-First React Native Apps with Local Sync',
    metaDescription: 'A practical architecture for building offline-first mobile applications with React Native, WatermelonDB, and conflict resolution.',
    content: `
<h2>The Offline Reality of Mobile Computing</h2>
<p>Mobile users do not experience constant high-speed fiber connectivity. They pass through subway tunnels, step into elevators, or work in low-reception zones. An app that displays a blocking spinner or loses user input during poor network conditions directly destroys user trust.</p>

<h2>Architecture of an Offline-First Client</h2>
<p>Instead of dispatching HTTP calls directly to a remote server on every user tap, an offline-first mobile client follows the <strong>Local-First Pattern</strong>:</p>
<ol>
  <li>Write data directly to an embedded local database (e.g., SQLite or WatermelonDB) synchronously.</li>
  <li>Update UI immediately from local state—zero latency for the user.</li>
  <li>Queue a sync operation in a persistent background sync queue.</li>
  <li>When network connectivity is detected, dispatch diffs to backend and resolve conflicts.</li>
</ol>
`
  },
  {
    _id: 'post_06',
    title: 'Quantum Computing Horizons: Breaking Down Commercial Milestones in 2026',
    slug: 'quantum-computing-horizons-breaking-down-commercial-milestones-in-2026',
    shortDescription: 'An objective analysis of fault-tolerant logical qubits, post-quantum cryptography migrations, and practical pharmaceutical simulations.',
    featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=80',
    category: 'cat_04',
    author: 'auth_02',
    tags: ['Quantum Computing', 'Emerging Tech', 'Cryptography', 'Innovation'],
    readingTime: '5 min read',
    status: 'published',
    isFeatured: false,
    views: 750,
    publishedAt: new Date('2026-11-05T13:45:00Z'),
    seoTitle: 'Quantum Computing Commercial Milestones (2026 Overview)',
    metaDescription: 'Unpacking the latest milestones in logical qubits, quantum error correction, and post-quantum cryptography standards.',
    content: `
<h2>From Noisy Intermediate-Scale to Fault-Tolerant Logical Qubits</h2>
<p>The quantum computing discourse has moved past raw physical qubit counts. The metric that truly matters in 2026 is <strong>logical qubit fidelity</strong> achieved through quantum error correction codes (QEC).</p>

<h2>Commercial Sectors Seeing Real Value</h2>
<ul>
  <li><strong>Molecular Simulation:</strong> Catalysts and polymer design that require exponential classical supercomputer hours.</li>
  <li><strong>Financial Portfolio Optimization:</strong> Quadratic unconstrained binary optimization (QUBO) calculations.</li>
  <li><strong>Post-Quantum Cryptography (PQC):</strong> Preparing corporate PKI infrastructure for NIST-standardized lattice-based algorithms.</li>
</ul>
`
  },
  {
    _id: 'post_07',
    title: 'The Evolution of Engineering Leadership: How Tech Stacks Shape Engineering Culture',
    slug: 'the-evolution-of-engineering-leadership-how-tech-stacks-shape-engineering-culture',
    shortDescription: 'Conway\'s Law states that organizations design systems that mirror their communication structures. Here is how modern VPs of Engineering invert that law to build high-velocity teams.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    category: 'cat_07',
    author: 'auth_01',
    tags: ['Engineering Leadership', 'Culture', 'Conway Law', 'Career'],
    readingTime: '7 min read',
    status: 'published',
    isFeatured: false,
    views: 1640,
    publishedAt: new Date('2026-11-07T16:00:00Z'),
    seoTitle: 'How Architecture and Tech Stacks Shape Engineering Culture',
    metaDescription: 'Exploring the symbiotic relationship between system architecture, team boundaries, and company culture.',
    content: `
<h2>The Reverse Conway Maneuver</h2>
<p>In 1967, computer programmer Melvin Conway formulated what is now known as Conway's Law: <em>"Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."</em></p>

<p>When organizations recognize this pattern, progressive engineering leadership utilizes the <strong>Reverse Conway Maneuver</strong>: purposefully evolving team topologies and system boundaries to promote autonomous, cross-functional ownership.</p>
`
  },
  {
    _id: 'post_08',
    title: 'Mastering Micro-Frontends: Independent Delivery at Enterprise Scale',
    slug: 'mastering-micro-frontends-independent-delivery-at-enterprise-scale',
    shortDescription: 'Module Federation, runtime composition, shared component design systems, and avoiding common performance pitfalls.',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
    category: 'cat_01',
    author: 'auth_02',
    tags: ['Micro Frontends', 'Webpack', 'React', 'Frontend Architecture'],
    readingTime: '5 min read',
    status: 'published',
    isFeatured: false,
    views: 940,
    publishedAt: new Date('2026-11-09T09:15:00Z'),
    seoTitle: 'Enterprise Micro-Frontends with Module Federation',
    metaDescription: 'A complete guide to designing modular, team-autonomous micro-frontend architectures with Webpack Module Federation.',
    content: `
<h2>When Does a Frontend Monolith Break Down?</h2>
<p>When your frontend organization surpasses 50+ engineers across multiple feature squads, a single Git repository and monolithic deployment pipeline frequently becomes a major bottleneck. Deployments queue up, build times lengthen, and one team's syntax error blocks every other team's release.</p>

<h2>Runtime vs Build-Time Integration</h2>
<p>Modern micro-frontend platforms use <strong>Webpack Module Federation</strong> or native ESM dynamic imports to stitch independently deployed bundles together inside the client browser without full-page reloads.</p>
`
  }
];

module.exports = {
  initialCategories,
  initialAuthors,
  initialPosts
};

