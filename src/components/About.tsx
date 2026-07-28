import { KnotDivider } from "./KnotDivider";

export function About() {
  return (
    <section id="sobre" className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:gap-16 md:px-10 md:py-28">
        <div className="md:col-span-5">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-bone">
            <img
              src="/placeholders/bag4.jpg"
              alt="Detalhe das mãos crochetando o fio de malha de uma bolsa NUMA"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <KnotDivider label="Nossa essência" className="mb-6 max-w-xs" />
          <h2 className="font-display text-3xl font-light leading-tight text-ink md:text-4xl">
            Entre fios e metais:
            <br />
            <span className="italic text-clay">a essência da NUMA.</span>
          </h2>
          <div className="mt-6 space-y-4 font-body text-[15px] leading-relaxed text-ink-soft">
            <p>
              A NUMA Crochê nasceu da vontade de ressignificar o trabalho
              manual para a mulher contemporânea. Em um mundo acelerado e de
              produção em massa, criamos bolsas atemporais em crochê manual com
              estrutura em fio de malha e detalhes marcantes em metais.
            </p>
            <p>
              Cada peça é feita à mão, nó por nó, combinando estética orgânica
              e força estrutural. Sem reposições idênticas: cada bolsa carrega sua
              própria exclusividade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}