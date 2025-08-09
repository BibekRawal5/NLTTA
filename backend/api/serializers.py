from rest_framework import serializers
from .models import Feed, FeedItem, Translate

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = '__all__'


class FeedItemSerializer(serializers.ModelSerializer):
    feed = FeedSerializer()

    class Meta:
        model = FeedItem
        fields = '__all__'

    def create(self, validated_data):
        feed_data = validated_data.pop('feed')
        feed, _ = Feed.objects.get_or_create(**feed_data)
        print(feed)
        return FeedItem.objects.create(feed=feed, **validated_data)


class TranslateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translate
        fields = '__all__'
        read_only_fields = ['created_at']
