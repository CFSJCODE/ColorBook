/**
 * =====================================================================
 * COLORBOOK v2.0 — Advanced Interaction Engine
 * Arquitetura de Alta Performance: Fluent UI + Liquid Glass + 3D Tilt
 * Desenvolvido com foco em Escalabilidade, Complexidade O(1) no DOM 
 * e Gerenciamento Unidirecional de Estado.
 * =====================================================================
 */
'use strict';

/**
 * Fonte de Verdade (Single Source of Truth)
 * Banco de dados JSON centralizado. Estrutura otimizada para iteração rápida.
 * @constant {Array<Object>}
 */
const PALETTES_DB = [
    { id: 'icy-gunmetal', t: 'Icy Blue & Gunmetal', tag: 'Paleta Duo', tc: '#A4D8FF', d: 'Contraste técnico e frio. O Gunmetal fornece base sólida, enquanto o Icy Blue atua como destaque luminoso, ideal para telemetria.', c: [{h:'#35393C', n:'Gunmetal'}, {h:'#A4D8FF', n:'Icy Blue'}], ic: 'fa-microchip', mt: 'Módulo de Monitoramento' },
    { id: 'violet-tempest', t: 'Violet Tempest', tag: 'Paleta Trio', tc: '#7FFFD4', d: 'Progressão dramática. O peso do Midnight Blue funde-se à intensidade do Violet, culminando no choque brilhante do Aquamarine.', c: [{h:'#191970', n:'Midnight Blue'}, {h:'#9400D3', n:'Dark Violet'}, {h:'#7FFFD4', n:'Aquamarine'}], ic: 'fa-brain', mt: 'Processamento de Dados' },
    { id: 'twilight-core', t: 'Twilight Core', tag: 'Paleta Trio', tc: '#EA6C56', d: 'Transição térmica de alta legibilidade. O contraste do azul profundo com o núcleo incandescente é perfeito para mapas de calor.', c: [{h:'#334075', n:'French Blue'}, {h:'#621122', n:'Night Bordeaux'}, {h:'#EA6C56', n:'Vibrant Coral'}], ic: 'fa-temperature-high', mt: 'Painel Térmico' },
    { id: 'toxic-nightfall', t: 'Toxic Nightfall', tag: 'Paleta Trio', tc: '#ADFF30', d: 'Contraste agressivo e de emergência. A transição abrupta do verde radioativo o torna perfeito para sistemas de alerta crítico.', c: [{h:'#240060', n:'Indigo Ink'}, {h:'#DB123C', n:'Classic Crimson'}, {h:'#ADFF30', n:'Green Yellow'}], ic: 'fa-exclamation-triangle', mt: 'Alerta de Sistema' },
    { id: 'ancient-gild', t: 'Ancient Gild', tag: 'Paleta Trio', tc: '#536878', d: 'Sofisticação e discrição. O espectro acinzentado remete a hardware estrutural metálico. Base impecável para painéis.', c: [{h:'#0A0A0A', n:'Onyx'}, {h:'#536878', n:'Blue Slate'}, {h:'#E5E4E2', n:'Alabaster'}], ic: 'fa-cube', mt: 'Painel de Controle' },
    { id: 'vivid-prism', t: 'Vivid Prism', tag: 'Paleta Trio', tc: '#00E5FF', d: 'Estética Cyberpunk. Interação de ultravioleta com aquamarine elétrico simula mapeamentos digitais para renderizações 3D.', c: [{h:'#1A0033', n:'Dark Amethyst'}, {h:'#FF00FF', n:'Magenta'}, {h:'#00E5FF', n:'Electric Aqua'}], ic: 'fa-satellite-dish', mt: 'Visualizador de Malha' },
    { id: 'raspberry-space', t: 'Raspberry & Space', tag: 'Paleta Duo', tc: '#EE005A', d: 'Um duo audacioso. Vermelho vibrante sobre a profundidade do azul noturno cria um visual forte, ideal para botões de CTA.', c: [{h:'#EE005A', n:'Raspberry Red'}, {h:'#012641', n:'Deep Space'}], ic: 'fa-rocket', mt: 'Dashboard Geral' },
    { id: 'shadow-sandy', t: 'Shadow & Sandy', tag: 'Paleta Duo', tc: '#D4AA7D', d: 'Elegante e orgânico. Cinza escuro serve como tela neutra, enquanto Sandy Clay adiciona um tom quente.', c: [{h:'#272727', n:'Shadow Grey'}, {h:'#D4AA7D', n:'Sandy Clay'}], ic: 'fa-robot', mt: 'Controle de Dispositivo' },
    { id: 'electric-chartreuse', t: 'Electric & Chartreuse', tag: 'Paleta Duo', tc: '#C1FE1A', d: 'Extremamente ácido e energético. Um visual de alta moda urbana, Y2K, ou interfaces disruptivas.', c: [{h:'#FE00AE', n:'Electric Rose'}, {h:'#C1FE1A', n:'Chartreuse'}], ic: 'fa-broadcast-tower', mt: 'Análise de Espectro' },
    { id: 'lime-grape', t: 'Lime & Grape', tag: 'Paleta Duo', tc: '#DDEA78', d: 'Contraste lúdico e retrô. Remete a tons vintage e de natureza onírica, excelente para ilustrações web.', c: [{h:'#DDEA78', n:'Lime Cream'}, {h:'#433455', n:'Vintage Grape'}], ic: 'fa-microphone-alt', mt: 'Controle de Mídia' },
    { id: 'celadon-plum', t: 'Celadon & Plum', tag: 'Paleta Duo', tc: '#A8D3A8', d: 'Suave, rústico e natural. A menta esmaecida contrasta com o marrom profundo.', c: [{h:'#A8D3A8', n:'Celadon'}, {h:'#553832', n:'Choco Plum'}], ic: 'fa-seedling', mt: 'Sensor Ambiental' },
    { id: 'midnight-plum', t: 'Midnight Plum', tag: 'Paleta Trio', tc: '#EBD3BB', d: 'Um conjunto sofisticado e escuro com um núcleo rico e uma luz de amêndoa. Perfeito para interfaces premium.', c: [{h:'#EBD3BB', n:'Almond Light'}, {h:'#49252F', n:'Plum Wine'}, {h:'#101211', n:'Carbon Power'}], ic: 'fa-battery-three-quarters', mt: 'Módulo de Bateria' },
    { id: 'mahogany-blossom', t: 'Mahogany Blossom', tag: 'Paleta Trio', tc: '#EA6B7E', d: 'Quente, acolhedor e com personalidade. A base de linho com o rosa chiclete e o mogno cria um esquema flexível.', c: [{h:'#4C1413', n:'Rich Mahogany'}, {h:'#EA6B7E', n:'Bubblegum'}, {h:'#FAF1E8', n:'Linen'}], ic: 'fa-fingerprint', mt: 'Perfil de Usuário' },
    { id: 'earthy-velvet', t: 'Earthy Velvet', tag: 'Paleta Trio', tc: '#847862', d: 'Mudo e elegante. Tons ocre e verde oliva escuro transmitem estabilidade e calmaria.', c: [{h:'#27271F', n:'Green Velvet'}, {h:'#847862', n:'Sandelwood'}, {h:'#EBD3BB', n:'Almond Light'}], ic: 'fa-map-marked-alt', mt: 'Scanner de Área' },
    { id: 'twilight-powder', t: 'Twilight Indigo', tag: 'Paleta Duo', tc: '#F9DEC9', d: 'Contraste calmo. O anil profundo proporciona um fundo repousante, enquanto o tom de pétala atua como destaque.', c: [{h:'#3A405A', n:'Twilight Indigo'}, {h:'#F9DEC9', n:'Powder Petal'}], ic: 'fa-compress-arrows-alt', mt: 'Controle de Válvula' },
    { id: 'blue-butter', t: 'Blue & Morning', tag: 'Paleta Duo', tc: '#F3D98F', d: 'Paleta suave e industrial-chic. Excelente para interfaces diurnas de sistemas de gestão predial.', c: [{h:'#7298C7', n:'Blue Grey'}, {h:'#F3D98F', n:'Morning Butter'}], ic: 'fa-wind', mt: 'Qualidade do Ar' },
    { id: 'crimson-periwinkle', t: 'Crimson Violet', tag: 'Paleta Duo', tc: '#B5BEDD', d: 'Duo robusto com um fundo denso complementado por um tom gélido e lilás. Ideal para cibersegurança.', c: [{h:'#470B24', n:'Crimson Violet'}, {h:'#B5BEDD', n:'Periwinkle'}], ic: 'fa-project-diagram', mt: 'Status de Conexão' },
    { id: 'antique-burgundy', t: 'Antique Burgundy', tag: 'Paleta Duo', tc: '#F7E6D2', d: 'Visual clássico e imponente. O borgonha cria uma base sofisticada para o contraste macio do branco.', c: [{h:'#F7E6D2', n:'Antique White'}, {h:'#90202C', n:'Burgundy'}], ic: 'fa-terminal', mt: 'Console de Sistema' },
    { id: 'thistle-mocha', t: 'Thistle Mocha', tag: 'Paleta Duo', tc: '#D6C8DF', d: 'Par orgânico e texturizado. O tom achocolatado serve de âncora visual para os dados em púrpura.', c: [{h:'#D6C8DF', n:'Thistle'}, {h:'#332927', n:'Deep Mocha'}], ic: 'fa-tachometer-alt', mt: 'Painel de Desempenho' },
    { id: 'neon-petal', t: 'Neon Petal', tag: 'Paleta Trio', tc: '#CEFF32', d: 'Vibrante e saturada. A progressão gera um alerta visual irresistível. Útil para secções de erro crítico.', c: [{h:'#EC2B7A', n:'Neon Pink'}, {h:'#FE7BBF', n:'Pink Carnation'}, {h:'#CEFF32', n:'Chartreuse'}], ic: 'fa-satellite', mt: 'Sensor de Profundidade' },
    { id: 'electric-tundra', t: 'Electric Tundra', tag: 'Paleta Trio', tc: '#00FFFF', d: 'Fria e tecnológica. O degradê do azul marinho para o ciano evoca velocidade de processamento.', c: [{h:'#050A30', n:'Prussian Blue'}, {h:'#0000FF', n:'Blue'}, {h:'#00FFFF', n:'Cyan'}], ic: 'fa-snowflake', mt: 'Arrefecimento' },
    { id: 'violet-tempest-v2', t: 'Violet Tempest V2', tag: 'Paleta Trio', tc: '#FFFF00', d: 'Transição forte de cores térmicas: Teal para Pêssego e Amarelo limpo. Módulos de espetrometria.', c: [{h:'#0077BE', n:'Bright Teal'}, {h:'#E2725B', n:'Burnt Peach'}, {h:'#FFFF00', n:'Yellow'}], ic: 'fa-radar', mt: 'Sensor de Movimento' },
    { id: 'ancient-gild-v2', t: 'Ancient Gild V2', tag: 'Paleta Trio', tc: '#E0D794', d: 'Cereja negro e tons amarelados envelhecidos. Excelente para gerir fluxos de energia.', c: [{h:'#550003', n:'Black Cherry'}, {h:'#B8AB38', n:'Old Gold'}, {h:'#E0D794', n:'Vanilla'}], ic: 'fa-bolt', mt: 'Consumo de Energia' },
    { id: 'colonial-cobalt', t: 'Colonial Cobalt', tag: 'Paleta Trio', tc: '#E6E6FA', d: 'Transição etérea focada em tons roxos. Evoca ambientes dinâmicos e de processamento.', c: [{h:'#240A24', n:'Midnight Violet'}, {h:'#9932CC', n:'Blue Violet'}, {h:'#E6E6FA', n:'Lavender'}], ic: 'fa-network-wired', mt: 'Análise de Dados' },
    { id: 'blue-slate-trio', t: 'Blue Slate Trio', tag: 'Paleta Trio', tc: '#EDB1B0', d: 'Contraste sofisticado entre tons industriais e orgânicos. Sistemas de painéis administrativos.', c: [{h:'#5B6E7D', n:'Blue Slate'}, {h:'#EDB1B0', n:'Powder Blush'}, {h:'#5C0403', n:'Black Cherry'}], ic: 'fa-tint', mt: 'Reservatório' },
    { id: 'vanilla-sky-trio', t: 'Vanilla Sky Trio', tag: 'Paleta Trio', tc: '#C3DAE8', d: 'Leveza e alta legibilidade diurna. Indicada para dashboards ambientais e dados climáticos.', c: [{h:'#FEEFB6', n:'Vanilla Custard'}, {h:'#C3DAE8', n:'Pale Sky'}, {h:'#432F2E', n:'Deep Mocha'}], ic: 'fa-cloud-sun', mt: 'Clima' },
    { id: 'punch-olive-trio', t: 'Punch Olive Trio', tag: 'Paleta Trio', tc: '#B0BC68', d: 'Cores de sinalização clássica reinventadas. O Punch Red transporta urgência instintiva.', c: [{h:'#EB313F', n:'Punch Red'}, {h:'#FFFECD', n:'Cream'}, {h:'#B0BC68', n:'Muted Olive'}], ic: 'fa-shield-alt', mt: 'Aviso Crítico' },
    { id: 'mauve-khaki-trio', t: 'Mauve Khaki Trio', tag: 'Paleta Trio', tc: '#DDA84C', d: 'Terroso, paramétrico e tático. Ecrãs de mapeamento no terreno e exibição de topografias.', c: [{h:'#52313A', n:'Mauve Shadow'}, {h:'#3D3E14', n:'Dark Khaki'}, {h:'#DDA84C', n:'Honey Bronze'}], ic: 'fa-map', mt: 'Coordenadas' },
    { id: 'dust-olive-trio', t: 'Dust Olive Trio', tag: 'Paleta Trio', tc: '#D3D1C5', d: 'Estética utilitária mecânica e empoeirada. Interfaces de visualização de chassi mecânico.', c: [{h:'#D3D1C5', n:'Dust Grey'}, {h:'#7D731C', n:'Olive'}, {h:'#BE8A7C', n:'Rosy Taupe'}], ic: 'fa-truck-monster', mt: 'Tração' },
    { id: 'lilac-cream', t: 'Lilac & Cream', tag: 'Paleta Duo', tc: '#C8A2C9', d: 'Suave e digital. Uma dupla etérea apta para o frontend comunicativo de assistentes virtuais.', c: [{h:'#C8A2C9', n:'Lilac'}, {h:'#FEFBCE', n:'Cream'}], ic: 'fa-robot', mt: 'Assistente Virtual' },
    { id: 'fuchsia-icy', t: 'Fuchsia Icy', tag: 'Paleta Duo', tc: '#F8395A', d: 'Rutura de diferencial térmico. Modelado para sistemas de termovisão e relatórios de aquecimento.', c: [{h:'#F8395A', n:'Hot Fuchsia'}, {h:'#B3D1ED', n:'Icy Blue'}], ic: 'fa-fire', mt: 'Termovisão' },
    { id: 'coffee-tea', t: 'Coffee & Tea', tag: 'Paleta Duo', tc: '#DDF4C9', d: 'Mapeamento biológico e visualização de alta precisão. Excelente utilidade em relatórios químicos.', c: [{h:'#3E2723', n:'Dark Coffee'}, {h:'#DDF4C9', n:'Tea Green'}], ic: 'fa-flask', mt: 'Análise Química' },
    { id: 'golden-hour', t: 'Golden Hour', tag: 'Paleta Trio', tc: '#FFD700', d: 'Transição térmica intensa e de elevado contraste energético. Gerenciamento de carga.', c: [{h:'#800020', n:'Burgundy'}, {h:'#FF4500', n:'Crimson Carrot'}, {h:'#FFD700', n:'Gold'}], ic: 'fa-solar-panel', mt: 'Energia' },
    { id: 'retro-future', t: 'Retro Future', tag: 'Paleta Trio', tc: '#FF00FF', d: 'HUD de estética cyberpunk pura. O alto contraste foi configurado para dashboards vetoriais.', c: [{h:'#0A0A0A', n:'Onyx'}, {h:'#FF00FF', n:'Magenta'}, {h:'#FFFF00', n:'Yellow'}], ic: 'fa-crosshairs', mt: 'Rastreamento HUD' },
    { id: 'vivid-prism-v2', t: 'Vivid Prism V2', tag: 'Paleta Trio', tc: '#D9F855', d: 'Variante luminosa ideal para visualização de dados volumétricos e topologias complexas.', c: [{h:'#D9F855', n:'Lime Yellow'}, {h:'#96A8FE', n:'Wisteria Blue'}, {h:'#EF6A3F', n:'Burnt Peach'}], ic: 'fa-memory', mt: 'Memória Gráfica' },
    { id: 'coffee-raspberry', t: 'Coffee & Raspberry', tag: 'Paleta Duo', tc: '#E30B5C', d: 'O Coffee Bean gera profundidade isolando o alerta agressivo providenciado pelo Raspberry Red.', c: [{h:'#2E1E1F', n:'Coffee Bean'}, {h:'#E30B5C', n:'Raspberry Red'}], ic: 'fa-exclamation-circle', mt: 'Aviso Severo' },
    { id: 'indigo-sandy', t: 'Indigo & Sandy', tag: 'Paleta Duo', tc: '#FAAE7B', d: 'Misteriosa e arenosa. Representa ambientes que demandam alto contraste suave e analítico.', c: [{h:'#432371', n:'Indigo Velvet'}, {h:'#FAAE7B', n:'Sandy Brown'}], ic: 'fa-chart-bar', mt: 'Frequência' },
    { id: 'fuchsia-antique', t: 'Fuchsia Antique', tag: 'Paleta Duo', tc: '#F8395A', d: 'Mistura entre a urgência do fúcsia saturado e a imaculada precisão do branco envelhecido.', c: [{h:'#F8395A', n:'Hot Fuchsia'}, {h:'#F7E6D2', n:'Antique White'}], ic: 'fa-code', mt: 'Logs Kernel' },
    { id: 'petal-coffee', t: 'Petal Frost', tag: 'Paleta Duo', tc: '#FFD1DC', d: 'Mapeamento estético Premium. A suavidade delicada contrastada para perfis administrativos.', c: [{h:'#FFD1DC', n:'Petal Frost'}, {h:'#1B1110', n:'Coffee Bean'}], ic: 'fa-sliders-h', mt: 'Configurações' },
    { id: 'evergreen-lime', t: 'Evergreen Lime', tag: 'Paleta Duo', tc: '#CEFF8C', d: 'Contraste orgânico e de alta eficiência. O escuro profundo minimiza o consumo em ecrãs OLED.', c: [{h:'#143731', n:'Evergreen'}, {h:'#CEFF8C', n:'Lime Cream'}], ic: 'fa-leaf', mt: 'Ambiente' },
];

/**
 * Motor Principal da Aplicação (App Controller / Architecture Core)
 * Implementa padrão Singleton/Engine, controle de estado isolado e manipulação
 * dinâmica avançada de DOM com alta performance.
 */
class ColorBookEngine {
    constructor(db) {
        this.db = db;
        
        // Gerenciamento de Estado Centralizado (Unidirectional Data Flow)
        this.state = {
            filteredPalettes: [...db],
            activeIndex: 0,
            searchQuery: ''
        };

        // Cache do DOM (O(1) lookup map, reduzindo repaints desnecessários)
        this.DOM = {
            navList: document.getElementById('nav-list'),
            mainContent: document.getElementById('main-content'),
            scrollArea: document.getElementById('main-scroll-area'),
            searchInput: document.getElementById('searchInput'),
            countBadge: document.getElementById('paletteCount'),
            bgGlow: document.getElementById('bg-glow'),
            toast: document.getElementById('toast'),
            toastVal: document.getElementById('toast-val'),
            orbsContainer: document.getElementById('ambient-orbs')
        };

        this.timers = { toast: null, debounce: null };
        
        // Binding explícito para os Event Listeners (Performance memory leak prevention)
        this.handleTiltMove = this.handleTiltMove.bind(this);
        this.handleTiltLeave = this.handleTiltLeave.bind(this);
    }

    /** * Inicializa a interface gráfica, injeta efeitos ambientais e conecta os motores de eventos.
     */
    init() {
        if (!this.DOM.mainContent) return; // Fail-safe
        this.initAmbientOrbs();
        this.bindEvents();
        this.renderAll();
    }

    /** * Otimização Matemática: Geração estática de strings de gradientes CSS.
     * @param {Array<Object>} colors Array de cores
     * @returns {string} Gradiente CSS
     */
    static getGradientStr(colors) {
        return `linear-gradient(135deg, ${colors.map(c => c.h).join(', ')})`;
    }

    /**
     * Padrão de Delegação de Eventos (Event Delegation).
     * Evita O(N) event listeners acoplados aos filhos iterativos, melhorando o Garbage Collection.
     */
    bindEvents() {
        // Motor de Busca Dinâmico com Debounce (150ms)
        this.DOM.searchInput?.addEventListener('input', (e) => {
            clearTimeout(this.timers.debounce);
            this.timers.debounce = setTimeout(() => this.handleSearch(e.target.value), 150);
        });

        // Event Delegation para Sidebar (Navegação)
        this.DOM.navList?.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-index]');
            if (btn) {
                const idx = parseInt(btn.dataset.index, 10);
                if (idx !== this.state.activeIndex) this.setState({ activeIndex: idx });
            }
        });

        // Event Delegation para Viewport Principal (Clipboard Action)
        this.DOM.mainContent?.addEventListener('click', (e) => {
            const copyTarget = e.target.closest('[data-copy]');
            if (copyTarget) {
                this.copyToClipboard(copyTarget.dataset.copy);
                // Feedback tátil visual micro-interativo
                copyTarget.classList.add('ring-2', 'ring-white', 'scale-95');
                setTimeout(() => copyTarget.classList.remove('ring-2', 'ring-white', 'scale-95'), 150);
            }
        });

        // Motor de Atalhos Globais de Teclado (Vim bindings & Esc)
        document.addEventListener('keydown', (e) => this.handleGlobalKeydown(e));
    }

    /** * Mutador de Estado Unidirecional (Simulando Reatividade React/Vue)
     * Redireciona para o pipeline de renderização.
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.renderAll();
    }

    /** * Algoritmo de Busca e Filtragem agnóstico a case-sensitivity.
     */
    handleSearch(query) {
        const lowerQuery = query.trim().toLowerCase();
        const filtered = this.db.filter(p => 
            p.t.toLowerCase().includes(lowerQuery) || 
            p.c.some(c => c.h.toLowerCase().includes(lowerQuery)) ||
            p.tag.toLowerCase().includes(lowerQuery)
        );

        this.setState({ 
            searchQuery: query,
            filteredPalettes: filtered,
            activeIndex: 0
        });
    }

    /** * Engenharia Avançada de Atalhos de Teclado 
     */
    handleGlobalKeydown(e) {
        const isSearching = document.activeElement === this.DOM.searchInput;

        // Ativa a busca ao pressionar "/"
        if (e.key === '/' && !isSearching) {
            e.preventDefault();
            this.DOM.searchInput?.focus();
            return;
        }
        
        // Cancela a busca ao pressionar "Esc"
        if (e.key === 'Escape' && isSearching) {
            this.DOM.searchInput.value = '';
            this.DOM.searchInput.blur();
            this.handleSearch('');
            return;
        }

        // Navegação de Paletas com Setas ou Vim (j/k)
        if (!isSearching && this.state.filteredPalettes.length > 0) {
            if (e.key === 'ArrowDown' || e.key === 'j') {
                e.preventDefault();
                const nextIdx = Math.min(this.state.activeIndex + 1, this.state.filteredPalettes.length - 1);
                this.setState({ activeIndex: nextIdx });
            } else if (e.key === 'ArrowUp' || e.key === 'k') {
                e.preventDefault();
                const prevIdx = Math.max(this.state.activeIndex - 1, 0);
                this.setState({ activeIndex: prevIdx });
            }
        }
    }

    /** * Ciclo Principal de Renderização do Virtual DOM stringificado
     */
    renderAll() {
        this.renderSidebar();
        this.renderMain();
        
        // Recalibra os listeners de Tilt 3D após o DOM ser injetado e renderizado
        requestAnimationFrame(() => this.attachTiltEffects());
    }

    /**
     * Renderiza o Índice de Paletas O(n) utilizando Template Literals
     */
    renderSidebar() {
        const { filteredPalettes, activeIndex } = this.state;
        
        if (this.DOM.countBadge) {
            this.DOM.countBadge.innerHTML = filteredPalettes.length === this.db.length 
                ? `<span class="opacity-50">//</span> ${this.db.length} Índices` 
                : `<span class="opacity-50">//</span> ${filteredPalettes.length} Resultados`;
        }

        if (filteredPalettes.length === 0) {
            this.DOM.navList.innerHTML = `
                <div class="p-6 text-center text-sm text-slate-500 font-mono">
                    <i class="fas fa-satellite-dish mb-2 text-2xl opacity-50 block"></i>
                    Sinal perdido. Nenhuma paleta atende aos parâmetros de busca.
                </div>`;
            return;
        }

        this.DOM.navList.innerHTML = filteredPalettes.map((p, idx) => {
            const isActive = idx === activeIndex;
            const gradient = ColorBookEngine.getGradientStr(p.c);
            const activeClasses = isActive 
                ? 'bg-white/10 border-white/20 shadow-lg text-white ring-1 ring-white/10' 
                : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200';
            
            return `
                <button data-index="${idx}" aria-current="${isActive}"
                    class="w-full text-left flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border ${activeClasses}">
                    <div class="flex flex-col gap-0.5 overflow-hidden pr-2">
                        <span class="text-sm font-medium truncate">${p.t}</span>
                        <span class="text-[10px] font-mono opacity-50 uppercase tracking-widest">${p.tag}</span>
                    </div>
                    <div class="flex h-6 w-6 shrink-0 rounded-full shadow-inner border border-white/20" style="background: ${gradient}"></div>
                </button>
            `;
        }).join('');

        // Comportamento autônomo de Scroll para a seleção ativa
        const activeBtn = this.DOM.navList.querySelector(`[data-index="${activeIndex}"]`);
        if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Renderiza o painel principal (Viewport). Usa injeção de classes de animação 
     * para transições fluidas inter-páginas.
     */
    renderMain() {
        const { filteredPalettes, activeIndex } = this.state;

        if (filteredPalettes.length === 0) {
            this.DOM.mainContent.innerHTML = '';
            if(this.DOM.bgGlow) this.DOM.bgGlow.style.background = 'transparent';
            return;
        }

        const p = filteredPalettes[activeIndex];
        const gradient = ColorBookEngine.getGradientStr(p.c);
        const mainColor = p.c[p.c.length > 1 ? 1 : 0].h;
        const bgColor = p.c[0].h;

        // Fundo emissivo reativo
        if (this.DOM.bgGlow) {
            this.DOM.bgGlow.style.background = gradient;
        }

        // Swatches Gerados Semanticamente
        const swatchesHtml = `
            <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" aria-label="Amostras de Cores Sólidas">
                ${p.c.map(color => `
                    <li>
                        <button data-copy="${color.h}" aria-label="Copiar HEX ${color.n}"
                            class="js-tilt w-full group relative flex flex-col overflow-hidden rounded-2xl glass-panel cursor-pointer border-t border-white/20 focus:outline-none transition-transform shadow-lg will-change-transform">
                            <div class="h-32 w-full transition-transform duration-500 group-hover:scale-105" style="background-color: ${color.h}" aria-hidden="true"></div>
                            
                            <div class="absolute inset-0 flex items-center justify-center opacity-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                                <span class="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
                                    <i class="fas fa-copy mr-2"></i>Copiar HEX
                                </span>
                            </div>
                            
                            <div class="p-5 bg-gray-900/60 backdrop-blur-xl text-left">
                                <h3 class="text-base font-semibold text-white truncate">${color.n}</h3>
                                <p class="mt-1 text-sm font-mono text-slate-400">${color.h}</p>
                            </div>
                        </button>
                    </li>
                `).join('')}
            </ul>
        `;

        // Construção do DOM Principal com stagger animations
        this.DOM.mainContent.innerHTML = `
            <div class="mx-auto w-full max-w-5xl pb-20 animate-slideUp">
                
                <header class="mb-10 tilt-container">
                    <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-widest shadow-sm backdrop-blur-md transition-transform hover:scale-105 cursor-default" 
                          style="color: ${p.tc}; border-color: ${p.tc}40; background-color: ${p.tc}10">
                        <i class="fas fa-tag mr-2 opacity-70"></i> ${p.tag}
                    </span>
                    <h2 class="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">${p.t}</h2>
                    <p class="mt-4 max-w-2xl text-lg text-slate-400 leading-relaxed">${p.d}</p>
                </header>

                <button data-copy="${gradient}" class="js-tilt group relative w-full overflow-hidden rounded-3xl p-1 transition-transform mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/5 tilt-container focus:outline-none will-change-transform">
                    <div class="absolute inset-0 transition-opacity duration-500 opacity-80 group-hover:opacity-100" style="background: ${gradient}"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div class="relative flex h-32 md:h-40 items-center justify-center rounded-[22px] border border-white/20 bg-gray-950/20 backdrop-blur-md transition-colors group-hover:bg-transparent">
                        <span class="rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition-transform group-hover:scale-105 shadow-xl flex items-center">
                            <i class="fas fa-copy mr-2"></i> Copiar Código CSS (Gradient)
                        </span>
                    </div>
                </button>

                <section>
                    <h3 class="mb-6 text-sm font-mono tracking-widest text-slate-400 uppercase"><i class="fas fa-palette mr-2"></i>Análise Espectral</h3>
                    ${swatchesHtml}
                </section>

                <section aria-labelledby="interface-preview-title" class="mt-16">
                    <h3 id="interface-preview-title" class="mb-6 text-sm font-mono tracking-widest text-slate-400 uppercase"><i class="fas fa-layer-group mr-2"></i>Mockup Liquid Glass</h3>
                    <article class="js-tilt relative overflow-hidden rounded-3xl glass-panel border border-[${mainColor}]/30 bg-[${bgColor}]/80 p-8 shadow-2xl transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] will-change-transform">
                        <div class="absolute -right-12 -top-12 opacity-10 blur-sm transition-transform duration-700 hover:scale-110 hover:blur-none" aria-hidden="true">
                            <i class="fas ${p.ic} text-[180px]" style="color: ${mainColor}"></i>
                        </div>
                        <div class="relative z-10 max-w-xl">
                            <div class="flex items-center gap-4 mb-6">
                                <div class="flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner border border-white/20" style="background: ${gradient}">
                                    <i class="fas ${p.ic} text-xl text-white"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold tracking-tight" style="color: ${mainColor}">${p.mt}</h4>
                                    <p class="text-sm font-mono text-slate-400 mt-1 uppercase tracking-wider">Status: <span style="color: ${p.tc}">Operacional</span></p>
                                </div>
                            </div>
                            
                            <div class="mt-8 space-y-4">
                                <div class="h-2 w-full overflow-hidden rounded-full bg-black/40 shadow-inner" aria-hidden="true">
                                    <div class="h-full rounded-full transition-all duration-1000 ease-out" style="width: 78%; background: ${gradient}"></div>
                                </div>
                                <div class="flex justify-between text-xs font-mono text-slate-500">
                                    <span>SYSTEM_LOAD</span>
                                    <span style="color: ${mainColor}">78%</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        `;
        
        // Scroll To Top instantâneo na troca de paleta
        if(this.DOM.scrollArea) this.DOM.scrollArea.scrollTo({ top: 0, behavior: 'instant' });
    }

    /**
     * Engine de Interação 3D (Física Computacional de Interface)
     * Anexa aos nós do DOM que contêm a classe `.js-tilt`
     */
    attachTiltEffects() {
        const tiltElements = this.DOM.mainContent.querySelectorAll('.js-tilt');
        tiltElements.forEach(el => {
            el._tiltMax = el.classList.contains('swatch-btn') ? 14 : 6; // Max angle dinâmico
            el.addEventListener('mousemove', this.handleTiltMove);
            el.addEventListener('mouseleave', this.handleTiltLeave);
        });
    }

    handleTiltMove(e) {
        const el = e.currentTarget;
        const max = el._tiltMax || 10;
        const r = el.getBoundingClientRect();
        
        // Equações vetoriais de rotação sobre o baricentro (centro do elemento)
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        
        el.style.transition = 'transform 80ms linear';
        el.style.transform = `perspective(1000px) rotateX(${(-dy * max).toFixed(2)}deg) rotateY(${(dx * max).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    handleTiltLeave(e) {
        const el = e.currentTarget;
        // Restauração de Spring Physics
        el.style.transition = 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = '';
    }

    /**
     * Motor Resiliente de Clipboard (Cópia para a Área de Transferência)
     * Aborda contornos restritivos de iFrames e contextos não-HTTPS.
     */
    copyToClipboard(text) {
        const fallbackCopy = (content) => {
            const textArea = document.createElement("textarea");
            textArea.value = content;
            textArea.style.cssText = "position:fixed;top:-9999px;left:-9999px;";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                this.showToast(content);
            } catch (err) {
                console.error('Falha de permissão no Clipboard.', err);
            } finally {
                document.body.removeChild(textArea);
            }
        };

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text)
                .then(() => this.showToast(text))
                .catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
    }

    /**
     * Controlador Autônomo da Interface de Notificações (Toast UI)
     */
    showToast(value) {
        const toast = this.DOM.toast;
        if (!toast || !this.DOM.toastVal) return;
        
        this.DOM.toastVal.innerText = value;
        toast.classList.remove('hidden');
        toast.style.animation = 'toastEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        
        clearTimeout(this.timers.toast);
        this.timers.toast = setTimeout(() => {
            toast.style.animation = 'toastExit 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            // Oculta completamente do DOM após a animação de saída (400ms)
            setTimeout(() => toast.classList.add('hidden'), 400);
        }, 2500);
    }

    /**
     * Injeção de Efeitos Ambientais (Partículas Orbs flutuantes)
     */
    initAmbientOrbs() {
        if (!this.DOM.orbsContainer) return;
        
        const orbs = [
            { c:'#3b82f6', s:400, x:20, y:15, d:0,  dur:14 },
            { c:'#8b5cf6', s:300, x:75, y:60, d:-4, dur:18 },
            { c:'#ec4899', s:250, x:55, y:85, d:-8, dur:12 },
            { c:'#14b8a6', s:350, x:10, y:70, d:-2, dur:16 },
        ];

        orbs.forEach(o => {
            const div = document.createElement('div');
            div.className = 'absolute rounded-full opacity-[0.05] pointer-events-none mix-blend-screen animate-orbFloat';
            div.style.cssText = `
                width: ${o.s}px; height: ${o.s}px; 
                background: ${o.c}; 
                top: ${o.y}%; left: ${o.x}%; 
                filter: blur(80px); 
                animation-duration: ${o.dur}s; 
                animation-delay: ${o.d}s;
                will-change: transform;
            `;
            this.DOM.orbsContainer.appendChild(div);
        });
    }
}

// ── Bootstrapping (Início da Execução do Sistema) ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Instancia o Engine com injeção de dependência do Banco de Dados
    window.ColorBookApp = new ColorBookEngine(PALETTES_DB);
    window.ColorBookApp.init();
});