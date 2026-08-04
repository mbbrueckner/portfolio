import { MotionConfig } from 'framer-motion';

import About from './components/About';
import Contact from './components/Contact';
import Controls from './components/Controls';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Projects from './components/Projects';
import ShaderBackground from './components/ShaderBackground';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ShaderBackground />
      <Nav />
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
