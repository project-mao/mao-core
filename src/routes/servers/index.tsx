import { Divider } from "~/components/daisy"
import { PAGE_CSS } from "~/mao"

export default function ServerListing() {
    return (
        <main class={PAGE_CSS}>
            <br/>
            <Divider/>
            <h1 class="text-6xl font-mono">Servers</h1>
            <Divider/>
            <br/>
        </main>
    );
}