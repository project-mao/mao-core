import { Divider, Page } from "~/components/utils"
import { PAGE_CSS } from "~/lib/mao"

export default function ServerListing() {
    return (
        <Page>
            <br/>
            <Divider/>
            <h1 class="text-6xl font-mono">Servers</h1>
            <Divider/>
            <br/>
        </Page>
    );
}