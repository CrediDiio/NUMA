export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-page px-6 pb-16 pt-8 md:px-10 md:pb-24 md:pt-12">
      <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
        {/* Texto */}
        <div className="order-2 md:order-1 md:col-span-4">
          <p className="label mb-4">Arte em cada ponto, presença em cada detalhe</p>
          <h1 className="font-display text-[2.6rem] font-light leading-[1.05] text-ink md:text-5xl">
            Cada bolsa carrega
            <span className="italic text-clay"> as mãos </span>
            que a fizeram.
          </h1>
          <p className="mt-6 max-w-sm font-body text-[15px] leading-relaxed text-ink-soft">
            Fios de malha robustos, pontos clássicos e detalhes inesperados —
            correntes, luas, estrelas. Cada peça NUMA é única, e pronta para
            se entrelaçar com a sua história.
          </p>
          <a
            href="#catalogo"
            className="group mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-label text-ink"
          >
            Ver a coleção
            <span className="h-px w-8 bg-ink transition-all duration-300 ease-knot group-hover:w-14 group-hover:bg-clay" />
          </a>
        </div>

        {/* Imagem de destaque */}
        <div className="order-1 md:order-2 md:col-span-8">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-card md:aspect-[16/11]">
            {/* Placeholder de imagem — substituir por foto real do produto em destaque */}
            <img
           src="/placeholders/bag1.jpg"
              alt="Bolsa NUMA Crochê Star, em fio de malha preto trançado com corrente de amuletos"
              className="h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-knot hover:scale-100"
            />
            <div className="absolute bottom-5 left-5 rounded-sm bg-bone/90 px-3 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-label text-ink">
                Star — Coleção Amuletos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
