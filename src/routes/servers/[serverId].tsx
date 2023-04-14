import { useParams } from "solid-start"
import "xterm/css/xterm.css"
import { Divider, Page } from "~/components/utils"
import { PAGE_CSS } from "~/lib/mao"

export default function ServerPage() {
    const { serverId } = useParams<{ serverId: string }>()
    return (
        <Page>
            <br/>
            <Divider/>
            <h1 class="text-6xl font-mono">Jack's server</h1>
            <h1 class="font-mono text-slate-500 mt-2">Server ID: {serverId}</h1>
            <Divider/>
        </Page>
    )
}