export const BrandPage = () => {
    return (
        <div className="hidden md:flex flex-col justify-center items-center bg-muted p-10 shadow-md">
            <img src="/logo.svg" alt="Logo" className="w-24 h-24 mb-4" />
            <h1 className="text-3xl font-bold text-center">Welcome to MyApp</h1>
            <p className="text-muted-foreground text-center mt-2">
                Your productivity starts here. Sign in to continue.
            </p>
        </div>
    );
};