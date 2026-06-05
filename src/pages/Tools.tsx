import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import { CATEGORIES, tools } from "../tools/registry";

export default function Tools() {
  const [params, setParams] = useSearchParams();
  const activeId = params.get("tool");
  const active = tools.find((t) => t.id === activeId) ?? null;

  const open = (id: string) => setParams({ tool: id });
  const close = () => setParams({}, { replace: true });

  const Active = active?.component;

  return (
    <div className="container-x pt-28 pb-20">
      {/* header */}
      <header className="max-w-2xl">
        <span className="eyebrow">Toolbox</span>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          개인 <span className="text-gradient">도구함</span>
        </h1>
        <p className="mt-4 text-pretty text-muted">
          보드게임, 타이머, 일상 유틸리티까지. 자주 쓰는 도구들을 한곳에 모았습니다.
          모든 데이터는 브라우저에만 저장되며 설치가 필요 없습니다.
        </p>
      </header>

      {/* categories */}
      <div className="mt-12 space-y-12">
        {CATEGORIES.map((cat) => {
          const list = tools.filter((t) => t.category === cat.id);
          return (
            <section key={cat.id}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <span aria-hidden>{cat.emoji}</span>
                {cat.label}
                <span className="text-sm font-normal text-muted">{list.length}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((t, i) => (
                  <motion.button
                    key={t.id}
                    onClick={() => open(t.id)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: 0.03 * i }}
                    className="bento group flex items-start gap-4 p-5 text-left"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-2/20 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                      <t.icon size={22} className="text-brand" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">{t.name}</span>
                      <span className="mt-1 block text-sm text-muted">{t.desc}</span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* tool modal */}
      <Modal open={!!active} onClose={close} className={active?.size ?? "max-w-2xl"}>
        {active && (
          <>
            <div className="flex items-center gap-3 border-b border-white/5 p-5 pr-16">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-2/20 ring-1 ring-white/10">
                <active.icon size={20} className="text-brand" />
              </span>
              <div>
                <h3 className="font-semibold leading-tight">{active.name}</h3>
                <p className="text-xs text-muted">{active.desc}</p>
              </div>
            </div>
            {Active && <Active />}
          </>
        )}
      </Modal>
    </div>
  );
}
