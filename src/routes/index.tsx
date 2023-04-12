import { Divider } from "~/components/daisy";
import { PAGE_CSS } from "~/mao"

export default function Home() {
    return (
        <main class={PAGE_CSS}>
            <br/>
            <Divider/>
            <h1 class="font-mono text-slate-500 mb-2">Welcome to</h1>
            <h1 class="text-6xl font-mono bg-gradient-to-r from-red-500 to-blue-400 text-transparent bg-clip-text">Project MaO</h1>
            <h1 class="font-mono text-slate-500 mt-2">the <span class="underline">Ma</span>chine <span class="underline">O</span>rchestra</h1>
            <Divider/>
            <br/>
            <ServerStats/>
        </main>
    );
}

function ServerStats() {
    return (
        <div class="stats stats-vertical lg:stats-horizontal shadow bg-primary text-primary-content">
            <div class="stat">
                <div class="stat-title text-primary-content">Online Servers</div>
                <div class="stat-value">0</div>
                <div class="stat-desc text-primary-content">out of 15 servers</div>
            </div>
            <div class="stat">
                <div class="stat-title text-primary-content">Bandwidth used</div>
                <div class="stat-value">4.2 GB</div>
                <div class="stat-desc text-primary-content">out of 1 TB</div>
            </div>
            <div class="stat">
                <div class="stat-title text-primary-content">New Registers</div>
                <div class="stat-value">1,200</div>
                <div class="stat-desc text-primary-content">↘︎ 90 (14%)</div>
            </div>
        </div>
    )
}