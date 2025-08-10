const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto py-6">
        <nav aria-label="Navegação principal">
          <a href="/" className="text-sm font-semibold hover:text-primary transition-colors">
            Início
          </a>
        </nav>
      </header>
      <main>
        <section className="container mx-auto py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">Hello World</h1>
          <p className="text-lg text-muted-foreground">Sua primeira tela no Lovable.</p>
        </section>
      </main>
      <footer className="container mx-auto py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Hello World Demo
      </footer>
    </div>
  );
};

export default Index;
