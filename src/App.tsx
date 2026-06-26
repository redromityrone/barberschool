import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/components/pages/HomePage';
import { HaircutsPage } from '@/components/pages/HaircutsPage';
import { FlowPage } from '@/components/pages/FlowPage';
import { DeckPage } from '@/components/pages/DeckPage';
import { Layout } from '@/components/layout/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cortes" element={<HaircutsPage />} />
        <Route path="/cortes/:id" element={<FlowPage />} />
        <Route path="/deck" element={<DeckPage />} />
      </Routes>
    </Layout>
  );
}
