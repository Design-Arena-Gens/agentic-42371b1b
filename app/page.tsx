import RainCanvas from "./components/RainCanvas";

export default function Page() {
  return (
    <main className="scene">
      <RainCanvas />
      <div className="ground" />

      <div className="girl" aria-label="Girl dancing in the rain">
        <div className="head" />
        <div className="hair" />
        <div className="body" />
        <div className="arm arm-left" />
        <div className="arm arm-right" />
        <div className="leg leg-left" />
        <div className="leg leg-right" />
      </div>

      <h1 className="title">Girl dancing in the rain</h1>
    </main>
  );
}
