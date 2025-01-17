from rest_framework import serializers
from .models import Persona, Conversation


class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['id', 'name', 'location',
                  'age', 'gender', 'role', 'interests']


class ConversationSerializer(serializers.ModelSerializer):
    persona_id = serializers.IntegerField(source='persona.id', read_only=True)
    persona_name = serializers.CharField(source='persona.name', read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'question', 'response', 'created_at', 'persona_name', 'persona_id', 'multi_chat_id']
