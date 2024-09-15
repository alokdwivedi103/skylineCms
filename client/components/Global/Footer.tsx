export default function Footer() {
  return (
    <footer className="bg-background w-full text-secondary-foreground">
      <div className="container py-2">&copy; {new Date().getFullYear()} Skyline CMS</div>
    </footer>
  )
}
