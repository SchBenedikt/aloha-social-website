import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Code, GitBranch, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Container, PageHeader, SectionHeading, CheckList } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contributing to Aloha Social",
  description: "How to contribute to Aloha Social: code style, PR process, testing, release workflow, and community guidelines.",
  alternates: { canonical: "/docs/contributing" },
};

export default function ContributingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Developer Documentation"
        title="Contributing to Aloha Social"
        lede="Aloha Social is a community-driven project. We welcome contributions of all kinds — code, documentation, translations, testing, and feedback."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="card card-hover p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 grid size-12 place-items-center rounded-xl bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400">
                  <Code className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[1.5rem] leading-tight font-semibold text-ink-strong">Code Contributions</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">Submit bug fixes, features, and improvements via pull requests.</p>
                </div>
              </div>
              <CheckList className="mt-6" items={[
                "Fork the repository and create a feature branch",
                "Read the repository AGENTS.md and follow its PHP, Vue, JavaScript and licensing conventions",
                "Write tests for new functionality",
                "Update documentation for user-facing changes",
                "Run the checks required for the changed area and review CI results",
                "Keep each pull request focused on one concern",
              ]} />
            </article>

            <article className="card card-hover p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 grid size-12 place-items-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <GitBranch className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[1.5rem] leading-tight font-semibold text-ink-strong">Git Workflow</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">Our branching model and commit conventions.</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 border-t border-line pt-5">
                {[
                  "Read AGENTS.md before changing code; it is the maintained project guide",
                  "Use scoped Conventional Commit subjects, such as fix(federation): …",
                  "Sign your own commits with git commit -s; an assistant must not add your DCO line",
                  "For AI-assisted changes, follow the disclosure and Assisted-by rules in AGENTS.md",
                  "Update docs/API.md and docs/Architecture.md with route or behavior changes",
                  "Rebuild and commit js/ when frontend source changes",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-ink">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="card card-hover p-6 sm:p-8 lg:col-span-2">
              <div className="flex items-start gap-4">
                <div className="shrink-0 grid size-12 place-items-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  <CheckCircle className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[1.5rem] leading-tight font-semibold text-ink-strong">Pull Request Requirements</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">All PRs must meet these criteria before merging.</p>
                </div>
              </div>
              <CheckList className="mt-6" items={[
                "Clear title and description explaining the change",
                "Discuss changes that span subsystems or need design decisions before implementation",
                "Include a regression test for fixes and tests appropriate to the changed subsystem",
                "Keep API and architecture documentation synchronized with code",
                "Run the relevant PHP and frontend checks described in AGENTS.md",
                "Review CI results and resolve failures before requesting merge",
                "Follow the release guide for version and changelog updates",
              ]} />
            </article>

            <article className="card card-hover p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 grid size-12 place-items-center rounded-xl bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  <AlertTriangle className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[1.5rem] leading-tight font-semibold text-ink-strong">Security & Responsible Disclosure</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">Report security issues privately.</p>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200">Do not open public issues for security vulnerabilities.</p>
                <p className="mt-2 text-[14.5px] text-red-700 dark:text-red-300">
                  Report vulnerabilities through <a className="underline" href="https://hackerone.com/nextcloud">Nextcloud&apos;s HackerOne programme</a> or <a className="underline" href="mailto:security@nextcloud.com">security@nextcloud.com</a>, following the current security policy.
                </p>
              </div>
            </article>

            <article className="card card-hover p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 grid size-12 place-items-center rounded-xl bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400">
                  <BookOpen className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[1.5rem] leading-tight font-semibold text-ink-strong">Documentation & Translations</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">Help improve our docs and make Aloha Social accessible worldwide.</p>
                </div>
              </div>
              <CheckList className="mt-6" items={[
                "Fix typos, clarify confusing sections",
                "Add missing examples or screenshots",
                "Translations are managed through Transifex; do not edit l10n files by hand",
                "Follow the documentation style guide",
                "Read docs/Releasing.md for the current release workflow",
              ]} />
            </article>
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <SectionHeading
              eyebrow="Development Setup"
              title="Local development environment"
              lede="Get up and running with the Aloha Social codebase."
            />
            <div className="mt-6 space-y-4 font-mono text-[13.5px]">
              <div className="code bg-surface/50 p-4 rounded-xl">
                <span className="comment"># Clone and install dependencies</span>
                <span className="block">git clone https://github.com/AlohaSocial/social.git</span>
                <span className="block">cd social</span>
                <span className="block">composer install</span>
                <span className="block">npm ci</span>
                <span className="block mt-2 comment"># Development build with hot reload</span>
                <span className="block">npm run dev</span>
                <span className="block mt-2 comment"># Run tests</span>
                <span className="block">npm run test</span>
                <span className="block mt-2 comment"># Lint and typecheck</span>
                <span className="block">npm run lint && npx tsc --noEmit</span>
                <span className="block mt-2 comment"># Build for production</span>
                <span className="block">npm run build</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/developers/docs/api" className="btn btn-primary">
              View API Reference
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/developers" className="btn btn-outline">
              <ArrowLeft className="size-4" />
              Developer Resources
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
