from django.urls import path
from .views import AskQuestionView, GeneratePersonaView, MultiConversationListView, CustomTokenObtainPairView, PersonaListView, AskMultiQuestionView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('personas/', PersonaListView.as_view(), name='personas'),
    path('conversations/', MultiConversationListView.as_view(), name='conversations'),
    path('ask/', AskQuestionView.as_view(), name='ask_question'),
    path('ask-multi/', AskMultiQuestionView.as_view(), name='ask_multi_question'),
    path('generate-persona/', GeneratePersonaView.as_view(), name='generate_persona')
]
