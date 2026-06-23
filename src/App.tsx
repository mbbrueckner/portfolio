import AsciiBackground from './components/AsciiBackground';
import Controls from './components/Controls';
import Hero from './components/Hero';

function App() {
  return (
    <>
      <AsciiBackground />
      <Controls />
      <main className="content">
        <Hero />
      </main>
    </>
  );
}

export default App;
