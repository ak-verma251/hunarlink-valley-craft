"""
Interactive Terminal Runner for HunarSathi (LangChain + Gemini 3.8 Flash).
Run: python cli_chat.py
"""

from chatbot import BOT_NAME, ask_hunarsathi, get_gemini_config, reset_session


def main():
    _, model_name = get_gemini_config()
    print("=" * 64)
    print(f"  {BOT_NAME} — HunarLink Buyer Assistant ({model_name})")
    print("  Ask anything about HunarLink crafts, GI tags, prices & orders.")
    print("  Type 'reset' to clear chat, or 'exit' to quit.")
    print("=" * 64)

    session_id = "cli-buyer"
    while True:
        try:
            user_input = input("\nYou: ").strip()
        except (EOFError, KeyboardInterrupt):
            print(f"\n{BOT_NAME}: Shukriya! Visit HunarLink anytime.")
            break

        if not user_input:
            continue
        if user_input.lower() in {"exit", "quit"}:
            print(f"{BOT_NAME}: Shukriya! Happy exploring Kashmiri heritage on HunarLink.")
            break
        if user_input.lower() == "reset":
            reset_session(session_id)
            print(f"{BOT_NAME}: Chat history cleared. How can I help you with HunarLink?")
            continue

        try:
            result = ask_hunarsathi(user_input, session_id=session_id)
            print(f"\n{BOT_NAME}: {result['reply']}")
        except Exception as err:
            print(f"\n[Error] {err}")


if __name__ == "__main__":
    main()

