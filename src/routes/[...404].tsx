import { Page } from "~/components/utils"
import { PAGE_CSS } from "~/lib/mao"

export default function NotFound() {
    return (
        <Page>
            <h1 class="text-6xl my-16">Oops!</h1>
            <p class="mt-8">How did we get here?</p>
        </Page>
    );
}
