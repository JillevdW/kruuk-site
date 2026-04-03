import LinktreePage from "./[slug]/page";

export default function LinksIndexPage() {
  return LinktreePage({params: Promise.resolve({slug: ""})})
}
