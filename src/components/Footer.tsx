import { GithubLogo, InstagramLogo, LinkedinLogo } from "phosphor-react";

export function Footer(){
  return (
    <footer className="bg-zinc-900 text-gray-400 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white">Prime <span className="text-rose-500">flix</span></h2>
            <p className="text-sm mt-1">Seu guia de filmes e séries</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            <a href="/" className="hover:text-white transition">Sobre</a>
            <a href="/" className="hover:text-white transition">Contato</a>
            <a href="/" className="hover:text-white transition">Termos de uso</a>
            <a href="/" className="hover:text-white transition">Privacidade</a>
          </div>

          <div className="flex space-x-5 text-xl">
            <a href="https://github.com/erickppn" target="_blank" className="hover:text-white">
              <GithubLogo />
            </a>
            <a href="https://instagram.com/whiskeyppn" target="_blank" className="hover:text-white">
              <InstagramLogo />
            </a>
            <a href="https://linkedin.com/in/erickppn" target="_blank" className="hover:text-white">
              <LinkedinLogo />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} PrimeFlix. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
