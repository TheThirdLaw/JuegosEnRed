package es.thethirdlaw.nonamegame;

public class Player {

	private long id;
	private int x, y;
	private int place;
	private boolean hasLightTrap;
	
	Player() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getPlace() {
		return place;
	}

	public void setPlace(int place) {
		this.place = place;
	}
	
	public void hasLT(boolean lt){
		this.hasLightTrap = lt;
	}
}
