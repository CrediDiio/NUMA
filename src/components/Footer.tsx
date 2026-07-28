import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-page px-6 py-14 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <img
              src="/brand/numa-logo.jpg"
              alt="NUMA Crochê"
              className="h-10 w-auto object-contain mix-blend-multiply"
            />
            <p className="mt-4 font-display text-[13px] italic leading-snug text-ink">
              Arte em cada ponto, presença em cada detalhe.
            </p>
            <p className="mt-3 max-w-[220px] font-body text-xs leading-relaxed text-ink-soft">
              Bolsas de crochê artesanais, feitas à mão em fio de malha,
              peça única a peça única.
            </p>
          </div>

          <div>
            <p className="label mb-4">Loja</p>
            <ul className="space-y-2 font-body text-sm text-ink-soft">
              <li><Link to="/#catalogo" className="hover:text-clay">Todas as bolsas</Link></li>
              <li><Link to="/#sobre" className="hover:text-clay">Sobre o ateliê</Link></li>
            </ul>
          </div>

          <div>
            <p className="label mb-4">Ajuda</p>
            <ul className="space-y-2 font-body text-sm text-ink-soft">
              <li><a href="#" className="hover:text-clay">Cuidados com a peça</a></li>
              <li><a href="#" className="hover:text-clay">Trocas e devoluções</a></li>
              <li><a href="#" className="hover:text-clay">Fale com o ateliê</a></li>
            </ul>
          </div>

          <div>
            <p className="label mb-4">Ateliê</p>
            <ul className="space-y-2 font-body text-sm text-ink-soft">
              <li><a href="#" className="hover:text-clay">Instagram</a></li>
              <li><a href="#" className="hover:text-clay">WhatsApp</a></li>
              <li><a href="#" className="hover:text-clay">contato@numacroche.com.br</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-wideish text-ink-soft md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} NUMA Crochê. Feito à mão no Brasil.</span>
          <span>Todas as peças são únicas — não há duas bolsas iguais.</span>
        </div>
      </div>
    </footer>
  );
}
