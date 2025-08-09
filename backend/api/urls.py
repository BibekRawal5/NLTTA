from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedViewSet, FeedItemViewSet, TranslateViewSet

router = DefaultRouter()
router.register(r'feeds', FeedViewSet)
router.register(r'feed-items', FeedItemViewSet)
router.register('translate', TranslateViewSet, basename='translate')


urlpatterns = [
    path('', include(router.urls)),
]