import { getItemsHandler } from "./api/api";
import { Metadata } from 'next';
import ClientPage from "./components/clientPage";

export const metadata: Metadata = {
    title: 'Fox Product List',
    description: 'Generated by create next app',
};

export default async function Home() {
    const initialItems = await getItemsHandler();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <ClientPage initialItems={initialItems} />
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            </footer>
        </div>
    );
}