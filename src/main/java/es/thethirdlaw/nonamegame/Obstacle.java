package es.thethirdlaw.nonamegame;

public class Obstacle {
	
	private double x, y;
	private boolean isRock;
	private double sprite;
	
	Obstacle(double x, double y, boolean isRock, double sprite) {
		this.x = x;
		this.y = y;
		this.isRock = isRock;
		this.sprite = sprite;
	}
	
	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}
	
	public double getSprite() {
		return sprite;
	}

	public void setSprite(double sprite) {
		this.sprite = sprite;
	}

	public boolean getIsRock() {
		return isRock;
	}

	public void setIsRock(boolean isRock) {
		this.isRock = isRock;
	}

}
