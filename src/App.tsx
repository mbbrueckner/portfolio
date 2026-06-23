import About from './components/About';
import AsciiBackground from './components/AsciiBackground';
import Contact from './components/Contact';
import Controls from './components/Controls';
import Hero from './components/Hero';
import Projects from './components/Projects';

function App() {
  return (
    <>
      <AsciiBackground />
      <Controls />
      <main className="content">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
