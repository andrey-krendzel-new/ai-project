export default function  EmptyState() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">AI Research Agent</h1>

                <p className="mt-4 text-gray-500">
                    Research anything you want. 
                </p>

                <div className="mt-8 space-y-2 text-sm text-gray-400">
                    <p>Compare React vs Vue</p>
                    <p>Research AI startups</p>
                    <p>Explain Docker networking</p>
                </div>
            </div>
        </div>
    );
}