import{_ as s,c as n,o as a,a as l}from"./app.1478ba28.js";const A=JSON.parse('{"title":"JavaScript API","description":"","frontmatter":{},"headers":[{"level":2,"title":"createServer","slug":"createserver"},{"level":2,"title":"InlineConfig","slug":"inlineconfig"},{"level":2,"title":"ViteDevServer","slug":"vitedevserver"},{"level":2,"title":"build","slug":"build"},{"level":2,"title":"preview","slug":"preview"},{"level":2,"title":"resolveConfig","slug":"resolveconfig"},{"level":2,"title":"transformWithEsbuild","slug":"transformwithesbuild"}],"relativePath":"guide/api-javascript.md"}'),p={name:"guide/api-javascript.md"},o=l(`<h1 id="javascript-api" tabindex="-1">JavaScript API <a class="header-anchor" href="#javascript-api" aria-hidden="true">#</a></h1><p>Vite&#39;s JavaScript APIs are fully typed, and it&#39;s recommended to use TypeScript or enable JS type checking in VS Code to leverage the intellisense and validation.</p><h2 id="createserver" tabindex="-1"><code>createServer</code> <a class="header-anchor" href="#createserver" aria-hidden="true">#</a></h2><p><strong>Type Signature:</strong></p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createServer</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">inlineConfig</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InlineConfig</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ViteDevServer</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p><strong>Example Usage:</strong></p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> createServer </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vite</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">server</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createServer</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// any valid user config options, plus \`mode\` and \`configFile\`</span></span>
<span class="line"><span style="color:#F07178;">    configFile</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    root</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">__dirname</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    server</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      port</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1337</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">server</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">server</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">printUrls</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)()</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">NOTE</p><p>When using <code>createServer</code> and <code>build</code> in the same Node.js process, both functions rely on <code>process.<wbr>env.</code><wbr><code>NODE_ENV</code> to work properly, which also depends on the <code>mode</code> config option. To prevent conflicting behavior, set <code>process.<wbr>env.</code><wbr><code>NODE_ENV</code> or the <code>mode</code> of the two APIs to <code>development</code>. Otherwise, you can spawn a child process to run the APIs separately.</p></div><h2 id="inlineconfig" tabindex="-1"><code>InlineConfig</code> <a class="header-anchor" href="#inlineconfig" aria-hidden="true">#</a></h2><p>The <code>InlineConfig</code> interface extends <code>UserConfig</code> with additional properties:</p><ul><li><code>configFile</code>: specify config file to use. If not set, Vite will try to automatically resolve one from project root. Set to <code>false</code> to disable auto resolving.</li><li><code>envFile</code>: Set to <code>false</code> to disable <code>.env</code> files.</li></ul><h2 id="vitedevserver" tabindex="-1"><code>ViteDevServer</code> <a class="header-anchor" href="#vitedevserver" aria-hidden="true">#</a></h2><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ViteDevServer</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * The resolved Vite config object.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedConfig</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * A connect app instance</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * - Can be used to attach custom middlewares to the dev server.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * - Can also be used as the handler function of a custom http server</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   *   or as a middleware in any connect-style Node.js frameworks.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * https://github.com/senchalabs/connect#use-middleware</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">middlewares</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Connect</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Server</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Native Node http server instance.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Will be null in middleware mode.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">httpServer</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">http</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Server</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Chokidar watcher instance.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * https://github.com/paulmillr/chokidar#api</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">watcher</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">FSWatcher</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Web socket server with \`send(payload)\` method.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ws</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WebSocketServer</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Rollup plugin container that can run plugin hooks on a given file.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pluginContainer</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PluginContainer</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Module graph that tracks the import relationships, url to file mapping</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * and hmr state.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">moduleGraph</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ModuleGraph</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Programmatically resolve, load and transform a URL and get the result</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * without going through the http request pipeline.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">transformRequest</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TransformOptions</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">TransformResult</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Apply Vite built-in HTML transforms and any plugin HTML transforms.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">transformIndexHtml</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> html</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Load a given URL as an instantiated module for SSR.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ssrLoadModule</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">fixStacktrace</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Fix ssr error stacktrace.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ssrFixStacktrace</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Error</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Start the server.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">listen</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">port</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> isRestart</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ViteDevServer</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Restart the server.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">forceOptimize</span><span style="color:#676E95;font-style:italic;"> - force the optimizer to re-bundle, same as --force cli flag</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">restart</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">forceOptimize</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Stop the server.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">close</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="build" tabindex="-1"><code>build</code> <a class="header-anchor" href="#build" aria-hidden="true">#</a></h2><p><strong>Type Signature:</strong></p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  inlineConfig</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InlineConfig</span></span>
<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">RollupOutput</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RollupOutput</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p><strong>Example Usage:</strong></p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> path </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">path</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> build </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vite</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">build</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    root</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./project</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    base</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/foo/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    build</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      rollupOptions</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)()</span></span>
<span class="line"></span></code></pre></div><h2 id="preview" tabindex="-1"><code>preview</code> <a class="header-anchor" href="#preview" aria-hidden="true">#</a></h2><p><strong>Type Signature:</strong></p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">preview</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">inlineConfig</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InlineConfig</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">PreviewServer</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p><strong>Example Usage:</strong></p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> preview </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vite</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">previewServer</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">preview</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// any valid user config options, plus \`mode\` and \`configFile\`</span></span>
<span class="line"><span style="color:#F07178;">    preview</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      port</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">8080</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      open</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">previewServer</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">printUrls</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)()</span></span>
<span class="line"></span></code></pre></div><h2 id="resolveconfig" tabindex="-1"><code>resolveConfig</code> <a class="header-anchor" href="#resolveconfig" aria-hidden="true">#</a></h2><p><strong>Type Signature:</strong></p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">resolveConfig</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  inlineConfig</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InlineConfig</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  command</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">build</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">serve</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  defaultMode</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ResolvedConfig</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>The <code>command</code> value is <code>serve</code> in dev (in the cli <code>vite</code>, <code>vite dev</code>, and <code>vite serve</code> are aliases).</p><h2 id="transformwithesbuild" tabindex="-1"><code>transformWithEsbuild</code> <a class="header-anchor" href="#transformwithesbuild" aria-hidden="true">#</a></h2><p><strong>Type Signature:</strong></p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">transformWithEsbuild</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  code</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  filename</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EsbuildTransformOptions</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  inMap</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span></span>
<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ESBuildTransformResult</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,30),e=[o];function t(c,r,y,i,F,D){return a(),n("div",null,e)}var d=s(p,[["render",t]]);export{A as __pageData,d as default};
