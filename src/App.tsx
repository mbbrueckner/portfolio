import { MotionConfig } from 'framer-motion';

import About from './components/About';
import Contact from './components/Contact';
import Controls from './components/Controls';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ShaderBackground from './components/ShaderBackground';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ShaderBackground />
      <Controls />
      <main className="content">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  );
}

export default App;
