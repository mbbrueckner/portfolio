import AsciiBackground from './components/AsciiBackground';
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
      </main>
    </>
  );
}

export default App;
