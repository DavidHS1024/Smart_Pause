from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "Smart Pause API"
    DATABASE_URL: str
    CORS_ORIGINS: str | list[str] = "http://localhost:5173"
    RECOMMENDATION_ALPHA: float = 0.6
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    
    def get_cors_origins_list(self) -> list[str]:
        if isinstance(self.CORS_ORIGINS, str):
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
        return self.CORS_ORIGINS

settings = Settings()
