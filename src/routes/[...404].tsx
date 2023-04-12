import { A } from "solid-start"
import { PAGE_CSS } from "~/mao"

export default function NotFound() {
    return (
        <main class={PAGE_CSS}>
            <h1 class="text-6xl my-16">Oops!</h1>
            <p class="mt-8">How did we get here?</p>
        </main>
    );
}
