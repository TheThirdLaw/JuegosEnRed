package es.thethirdlaw.nonamegame;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

	Map<Long, Player> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	Random rnd = new Random();

	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/game")
	public Collection<Player> getPlayers() {
		return players.values();
	}

	// Con POST creamos un nuevo jugador
	@PostMapping(value = "/game")
	@ResponseStatus(HttpStatus.CREATED)
	public Player newPlayer() {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		player.setId(id);
		if(id == 1) {
			player.setX(10);
			player.setPlace(1);
		}else {
			player.setX(100);
			player.setPlace(2);
		}
		player.setY(320);
		players.put(player.getId(), player);
		return player;
	}

	// Con este GET, podemos recuperar la información particular de cada uno de los
	// jugadores
	@GetMapping(value = "/game/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {
		Player player = players.get(id);
		if (player != null) {
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este PUT actualizamos la información del jugador con ID = id
	@PutMapping(value = "/game/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable long id, @RequestBody Player player) {
		Player savedPlayer = players.get(player.getId());
		if (savedPlayer != null) {
			savedPlayer.setX(player.getX());
			savedPlayer.setY(player.getY());
			savedPlayer.setTrap(player.getTrap());
			players.put(id, savedPlayer);
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este DELETE borramos el jugador con ID = id
	@DeleteMapping(value = "/game/{id}")
	public ResponseEntity<Player> borraJugador(@PathVariable long id) {
		Player savedPlayer = players.get(id);
		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//Falta una función que cree el mundo
	
	//Falta una función que cree la trampa (json¿?)
}
