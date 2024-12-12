"use client";

export default function AgentChat({ message, setMessage, onSubmit }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		onSubmit(message);
		setMessage('');
	};

	return (
		<div className="w-full max-w-4xl px-4 text-center">
			<form onSubmit={handleSubmit} className="relative group">
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type your message and press Enter..."
					className="w-full px-8 py-5 text-lg text-gray-200 bg-gray-800/50 border-2 border-gray-700 
                                 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)]
                                 focus:outline-none focus:border-gray-500 focus:shadow-[0_0_40px_rgba(0,0,0,0.5)]
                                 transition-all duration-300 ease-in-out
                                 placeholder:text-gray-500"
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 
                                  group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
			</form>
		</div>
	);
}
