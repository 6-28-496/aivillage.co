from django.apps import AppConfig

class VillageChatbotConfig(AppConfig):
    name = 'village_chatbot'

    def ready(self):
        import village_chatbot.signals
