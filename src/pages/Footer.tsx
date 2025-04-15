// components/Footer.tsx
export default function Footer() {
    return (
        <footer className="text-center py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Your Name. Built with Next.js & TailwindCSS.
        </footer>
    );
}
