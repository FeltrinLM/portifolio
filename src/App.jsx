import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';

export default function App() {
    return (
        <BrowserRouter>
            {/* Aqui definimos a cor de fundo global e a fonte principal */}
            <div className="min-h-screen bg-[#D0C697] text-slate-800 font-serif">

                {/* pb-[300px] garante que o conteúdo não fique escondido atrás do círculo mágico */}
                <main className="pb-[300px] p-10">
                    <Routes>
                        <Route path="/" element={<Navigate to="/sobre" replace />} />
                        <Route path="/sobre" element={<About />} />
                        <Route path="/experiencia" element={<Experience />} />
                        <Route path="/projetos" element={<Projects />} />
                        <Route path="/contato" element={<Contact />} />
                    </Routes>
                </main>

                {/* O Menu agora vai flutuar sobre o site */}
                <Navbar />
            </div>
        </BrowserRouter>
    );
}